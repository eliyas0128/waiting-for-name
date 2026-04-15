module {
  public type ProjectItem = {
    id : Nat;
    name : Text;
    description : Text;
    client : Text;
    location : Text;
    year : Text;
    photoUrls : [Text];
    createdAt : Int;
  };
};
