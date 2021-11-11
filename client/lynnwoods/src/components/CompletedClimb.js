const CompletedClimb = ({ completed_climb }) => {
  return (
    <div>
      <h1>{completed_climb.boulder.route}</h1>
      <p>{completed_climb.boulder.rating}</p>
      {/* <p>{completed_climb.location}</p> */}
      {completed_climb.witnesses.map((witness) => {
        return (
          <div>
            <p>Username: {witness.witness.username}</p>
            <p>{witness.accepted ? "Verified" : "Not verified"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CompletedClimb;
