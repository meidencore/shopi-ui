"use server";

import { get } from "./util/fetch";

export default async function getMe() {
  return await get("users/me");
}
