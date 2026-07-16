import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "demo1234",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
