import { Client, Language } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export async function searchAddress(lat: number, lng: number) {
  try {
    const response = await client.reverseGeocode({
      params: {
        latlng: { lat: lat, lng: lng },
        language: Language.ja,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
    });

    const formattedAddress = response.data.results[0].formatted_address;
    return formattedAddress
  } catch (error) {
    console.log(error);
    alert("位置情報が入手できませんでした。");
  }
}