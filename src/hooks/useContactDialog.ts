// @ts-nocheck -- original section script, kept line-for-line so behaviour is identical to the HTML site.
import type { RefObject } from "react";
import { useSectionScript } from "./useSectionScript";
import type { Scope } from "@/lib/createScope";

/** Section 12: runs the section's interactions once on mount and tears everything down on unmount. */
function init(ctx: Scope) {
  const SEC = ctx.root;
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var cta = document.getElementById("sec12-cta"),
    photo = document.getElementById("sec12-photo");

  // gentle parallax on the photo
  cta.addEventListener("mousemove", function (e) {
    if (reduce) return;
    var r = cta.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    photo.style.translate = -x * 18 + "px " + -y * 12 + "px";
  });
  cta.addEventListener("mouseleave", function () {
    photo.style.translate = "0 0";
  });

  document.getElementById("sec12-visit").addEventListener("click", function (e) {
    e.preventDefault();
  });
}

export function useContactDialog(ref: RefObject<HTMLElement | null>) {
  useSectionScript(ref, init);
}