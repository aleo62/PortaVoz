defmodule ServerWeb.ImageController do
  use ServerWeb, :controller
  alias Plug.Upload

  # handling upload
  def upload(conn, %{"upload_preset" => preset} = params) do
    cloud_name = Application.get_env(:cloudex, :cloud_name)
    url = "https://api.cloudinary.com/v1_1/#{cloud_name}/image/upload"

    file = Map.get(params, "file")
    remote_url = Map.get(params, "url")

    cond do
      # handling if user sends both file and url
      file && remote_url ->
        json(conn, %{error: "Send just file or just url"})

      # handling if user sends just file
      file && match?(%Upload{}, file) ->
        body =
          {:multipart,
           [
             {:file, file.path, {"form-data", [name: "file", filename: file.filename]}, []},
             {"upload_preset", preset}
           ]}

        upload_request(conn, url, body)

      # handling if user sends just url
      remote_url ->
        body =
          {:multipart,
           [
             {"file", remote_url},
             {"upload_preset", preset}
           ]}

        upload_request(conn, url, body)

      # handling if user sends nothing
      true ->
        json(conn, %{error: "Must send 'upload preset' and 'file' or 'url'"})
    end
  end

  # handling if user sends nothing
  def upload(conn, _) do
    json(conn, %{error: "Must send 'upload preset' and 'file' or 'url'"})
  end

  # handling upload of url and file
  def upload_request(conn, url, body) do
    headers = []

    case HTTPoison.post(url, body, headers) do
      # successful response
      {:ok, %HTTPoison.Response{status_code: 200, body: res_body}} ->
        {:ok, response_map} = Jason.decode(res_body)
        image_url = response_map["secure_url"] || response_map["url"]
        json(conn, %{message: "Upload successful", image_url: image_url, cloudinary_response: response_map})

      # some error response
      {:ok, %HTTPoison.Response{status_code: code, body: res_body}} ->
        {:ok, response_map} = Jason.decode(res_body)
        json(conn, %{error: "Upload failed", status_code: code, cloudinary_response: response_map})

      # totally error response
      {:error, error} ->
        json(conn, %{
          error: "Upload failed",
          details: inspect(error)
        })
    end

  end


  # handling delete
  def delete(conn, %{"public_id" => public_id}) do
    cond do
      public_id === "" ->
        json(conn, %{error: "Must send 'public_id'"})

      true ->
        Cloudex.delete(public_id)
        json(conn, %{message: "You deleted this image: #{public_id}"})
    end
  end

  def delete(conn, _) do
    json(conn, %{error: "Must send 'public_id'"})
  end

  def test(conn, _params) do
    json(conn, %{message: "test"})
  end
end
