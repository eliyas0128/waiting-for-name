export interface GalleryItem {
  id: string;
  name: string;
  qty: string;
  imageUrl: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Civil Work & Project Photos
  {
    id: "g-ce-01",
    name: "Excavator Machine",
    qty: "",
    imageUrl: "/assets/generated/excavator_site.dim_800x600.jpg",
  },
  {
    id: "g-ce-02",
    name: "JCB Equipment",
    qty: "",
    imageUrl: "/assets/generated/jcb_loader.dim_800x600.jpg",
  },
  {
    id: "g-ce-03",
    name: "Construction Site",
    qty: "",
    imageUrl: "/assets/generated/construction_site.dim_800x600.jpg",
  },
  {
    id: "g-ce-04",
    name: "Heavy Machinery Fleet",
    qty: "",
    imageUrl: "/assets/generated/dump_trucks.dim_800x600.jpg",
  },
  {
    id: "g-ce-05",
    name: "Hydra Crane Operations",
    qty: "",
    imageUrl: "/assets/generated/hydra_crane.dim_800x600.jpg",
  },
  {
    id: "g-ce-06",
    name: "Dewatering Systems",
    qty: "",
    imageUrl: "/assets/generated/dewatering_pump.dim_800x600.jpg",
  },
  // Project Photos
  {
    id: "g-proj-01",
    name: "FGD Plant – DB Power Champa",
    qty: "",
    imageUrl: "/assets/generated/fgd_plant_01.dim_800x600.jpg",
  },
  {
    id: "g-proj-02",
    name: "Power Plant Construction",
    qty: "",
    imageUrl: "/assets/generated/fgd_plant_02.dim_800x600.jpg",
  },
  {
    id: "g-proj-03",
    name: "Induction Furnace – BALCO Korba",
    qty: "",
    imageUrl: "/assets/generated/induction_furnace_01.dim_800x600.jpg",
  },
  {
    id: "g-proj-04",
    name: "Smelting Plant Operations",
    qty: "",
    imageUrl: "/assets/generated/induction_furnace_02.dim_800x600.jpg",
  },
  {
    id: "g-proj-05",
    name: "Steel Structural Shed – BSP Bhilai",
    qty: "",
    imageUrl: "/assets/generated/steel_shed_01.dim_800x600.jpg",
  },
  {
    id: "g-proj-06",
    name: "Steel Structure Interior",
    qty: "",
    imageUrl: "/assets/generated/steel_shed_02.dim_800x600.jpg",
  },
  {
    id: "g-proj-07",
    name: "PEB Structure Erection – CRS Infra",
    qty: "",
    imageUrl: "/assets/generated/peb_building_01.dim_800x600.jpg",
  },
  {
    id: "g-proj-08",
    name: "Pre-Engineered Building",
    qty: "",
    imageUrl: "/assets/generated/peb_building_02.dim_800x600.jpg",
  },
  {
    id: "g-proj-09",
    name: "Slag Crusher – Jindal Angul",
    qty: "",
    imageUrl: "/assets/generated/crusher_plant_01.dim_800x600.jpg",
  },
  {
    id: "g-proj-10",
    name: "Crusher Plant Revamping",
    qty: "",
    imageUrl: "/assets/generated/crusher_plant_02.dim_800x600.jpg",
  },
  // Workshop & Engineering
  {
    id: "g-me-01",
    name: "Welding Workshop",
    qty: "",
    imageUrl: "/assets/generated/welding_workshop.dim_800x600.jpg",
  },
  {
    id: "g-me-02",
    name: "Steel Fabrication Yard",
    qty: "",
    imageUrl: "/assets/generated/steel_fabrication.dim_800x600.jpg",
  },
  {
    id: "g-me-03",
    name: "Engineering & Design Review",
    qty: "",
    imageUrl: "/assets/generated/engineering_review.dim_800x600.jpg",
  },
  {
    id: "g-me-04",
    name: "Project Management",
    qty: "",
    imageUrl: "/assets/generated/project_management.dim_800x600.jpg",
  },
];

/**
 * Build dynamic gallery items from backend ProjectItem array.
 * Each photoUrl in a project becomes one GalleryItem with id "project-{id}-photo-{index}".
 */
export function projectPhotosToGalleryItems(
  projects: Array<{ id: bigint; name: string; photoUrls: string[] }>,
): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const project of projects) {
    project.photoUrls.forEach((url, index) => {
      items.push({
        id: `project-${project.id.toString()}-photo-${index}`,
        name: project.name,
        qty: "",
        imageUrl: url,
      });
    });
  }
  return items;
}
