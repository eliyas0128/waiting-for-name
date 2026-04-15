import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Types "../types/projects";

module {
  public type ProjectItem = Types.ProjectItem;

  public func createProject(
    projects : Map.Map<Nat, ProjectItem>,
    nextId : Nat,
    name : Text,
    description : Text,
    client : Text,
    location : Text,
    year : Text,
    photoUrls : [Text],
  ) : ProjectItem {
    let item : ProjectItem = {
      id = nextId;
      name;
      description;
      client;
      location;
      year;
      photoUrls;
      createdAt = Time.now();
    };
    projects.add(nextId, item);
    item;
  };

  public func getProjects(projects : Map.Map<Nat, ProjectItem>) : [ProjectItem] {
    projects.values().toArray();
  };

  public func deleteProject(projects : Map.Map<Nat, ProjectItem>, id : Nat) : Bool {
    switch (projects.get(id)) {
      case null false;
      case (?_) {
        projects.remove(id);
        true;
      };
    };
  };
};
