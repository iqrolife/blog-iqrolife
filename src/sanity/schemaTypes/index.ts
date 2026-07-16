import { author } from "./author";
import { blockContent } from "./blockContent";
import { category } from "./category";
import { post } from "./post";
import { program } from "./program";
import { siteSettings } from "./siteSettings";
import { storySubmission } from "./storySubmission";

export const schemaTypes = [
  post,
  author,
  category,
  program,
  storySubmission,
  siteSettings,
  blockContent,
];
