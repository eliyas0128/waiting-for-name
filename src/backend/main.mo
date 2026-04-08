import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";

actor {
  public type Feedback = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  let feedbacks : List.List<Feedback> = List.empty<Feedback>();
  var nextId : Nat = 0;

  public func submitFeedback(name : Text, email : Text, message : Text) : async () {
    let entry : Feedback = {
      id = nextId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    feedbacks.add(entry);
    nextId += 1;
  };

  public query func getFeedbacks() : async [Feedback] {
    feedbacks.reverse().toArray();
  };
};
