// @ts-nocheck -- original section script, kept line-for-line so behaviour is identical to the HTML site.
import type { RefObject } from "react";
import { useSectionScript } from "./useSectionScript";
import type { Scope } from "@/lib/createScope";

/** Section 13: runs the section's interactions once on mount and tears everything down on unmount. */
function init(ctx: Scope) {
  const SEC = ctx.root;
  var items = [].slice.call(SEC.querySelectorAll(".item"));

  function set(it, open) {
    it.classList.toggle("open", open);
    it.querySelector(".q").setAttribute("aria-expanded", open);
  }

  items.forEach(function (it, i) {
    var q = it.querySelector(".q");
    q.addEventListener("click", function () {
      var willOpen = !it.classList.contains("open");
      items.forEach(function (o) {
        set(o, false);
      }); // one open at a time
      set(it, willOpen);
    });
    q.addEventListener("keydown", function (e) {
      // arrow-key navigation
      var n =
        e.key === "ArrowDown"
          ? i + 1
          : e.key === "ArrowUp"
          ? i - 1
          : e.key === "Home"
          ? 0
          : e.key === "End"
          ? items.length - 1
          : null;
      if (n === null) return;
      e.preventDefault();
      items[(n + items.length) % items.length].querySelector(".q").focus();
    });
  });
}

export function useFaq(ref: RefObject<HTMLElement | null>) {
  useSectionScript(ref, init);
}