import { baseUrl } from "@/utils/constants";

const options = {
  method: "GET",
  headers: {
    "Accept-Version": "v1",
    Authorization: "Client-ID " + process.env.NEXT_PUBLIC_ACCESS_KEY,
  },
};

export async function getImages(data?: { page?: number }) {
  const queryParams = new URLSearchParams();
  if (data?.page) {
    queryParams.set("page", `${data.page}`);
  } else {
    queryParams.set("page", "1");
  }
  try {
    const resultResponse = await fetch(
      `${baseUrl}photos?${queryParams}`,
      options
    );
    const response = await resultResponse.json();
    return response;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function searchImages(data: { query: string; page?: number }) {
  const queryParams = new URLSearchParams();
  if (data.query) queryParams.set("query", data.query);
  if (data.page) {
    queryParams.set("page", `${data.page}`);
  } else {
    queryParams.set("page", "1");
  }
  try {
    const resultResponse = await fetch(
      `${baseUrl}search/photos?${queryParams}`,
      options
    );
    const response = await resultResponse.json();
    return response;
  } catch (err) {
    console.error(err);
    return [];
  }
}
