import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId, writeToken } from "@/sanity/env";

export const sanityWriteClient = createClient({
  projectId: projectId || "demo1234",
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
});
