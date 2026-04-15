import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, L as Link, S as Skeleton } from "./index-rAAVCMgz.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-Cy4QAbrw.js";
import { p as projectPhotosToGalleryItems, G as GALLERY_ITEMS } from "./gallery-BUORiAkH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6", key: "pblm9e" }],
  ["path", { d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18", key: "nf6bnh" }],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["rect", { width: "16", height: "16", x: "6", y: "2", rx: "2", key: "12espp" }]
];
const Images = createLucideIcon("images", __iconNode);
function GalleryCard({ item }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": item.id,
      className: "group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: item.imageUrl,
          alt: item.name,
          loading: "lazy",
          className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
          onError: (e) => {
            e.currentTarget.src = "/assets/images/placeholder.svg";
          }
        }
      ) })
    }
  );
}
function GallerySkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Skeleton,
    {
      className: "aspect-[4/3] rounded-xl"
    },
    i
  )) });
}
function GalleryPage() {
  const { actor, isFetching } = useActor(createActor);
  const { data: backendProjects = [], isLoading } = useQuery({
    queryKey: ["gallery-projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
    throwOnError: false
  });
  const projectGalleryItems = projectPhotosToGalleryItems(backendProjects);
  const allItems = [...GALLERY_ITEMS, ...projectGalleryItems];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-8 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { size: 18, className: "text-accent-teal" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl sm:text-2xl text-foreground leading-tight", children: "Our Gallery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground", children: [
            allItems.length,
            " items — Perfect Designing Hub"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          size: "sm",
          "data-ocid": "gallery.back_button",
          className: "gap-2 font-body font-medium shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
            "Back to Home"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-2xl mb-8", children: "A comprehensive visual catalogue of our machinery fleet — heavy civil earthmoving equipment to precision mechanical workshop machines, powering infrastructure projects across India." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5", children: [
      GALLERY_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryCard, { item }, item.id)),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySkeletonGrid, {}) : projectGalleryItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryCard, { item }, item.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground", children: "Machinery fleet — Perfect Designing Hub, Bhilai, Chhattisgarh." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          size: "sm",
          "data-ocid": "gallery.back_bottom_button",
          className: "gap-2 font-body font-medium",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
            "Back to Home"
          ] })
        }
      )
    ] })
  ] });
}
export {
  GalleryPage as default
};
