import Map "mo:core/Map";
import ProjectsLib "../lib/projects";
import Types "../types/projects";

mixin (
  projects : Map.Map<Nat, Types.ProjectItem>,
) {
  var projectsNextId : Nat = 0;

  public func createProject(
    name : Text,
    description : Text,
    client : Text,
    location : Text,
    year : Text,
    photoUrls : [Text],
  ) : async Types.ProjectItem {
    let item = ProjectsLib.createProject(
      projects,
      projectsNextId,
      name,
      description,
      client,
      location,
      year,
      photoUrls,
    );
    projectsNextId += 1;
    item;
  };

  public query func getProjects() : async [Types.ProjectItem] {
    ProjectsLib.getProjects(projects);
  };

  public func deleteProject(id : Nat) : async Bool {
    ProjectsLib.deleteProject(projects, id);
  };
};
