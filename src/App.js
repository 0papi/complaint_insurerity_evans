import { useEffect, useState } from "react";

const API_URL = "https://test-demo-gql-backend.herokuapp.com/api/rest/data";

function App() {
  const [complaints, setComplaints] = useState([]);
  const [complaintInput, setComplaintInput] = useState("");

  const fetchComplaints = async () => {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "SECRET",
      },
    });

    const data = await res.json();

    if (res.ok) {
      setComplaints(data.complaint);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const onComplaintSubmit = (e) => {
    e.preventDefault();

    if (!complaintInput) {
      alert("Please you have not written any complaint");
    }

    const complaintData = {
      complaint: complaintInput,
      companyId: "ad6f4da8-06af-45be-ba79-83156a72471f",
      source: "web",
    };
    onCreateComplaint(complaintData);
  };

  const onCreateComplaint = async (complaintData) => {
    const res = await fetch(
      "https://test-demo-gql-backend.herokuapp.com/api/rest/complaints",
      {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "SECRET",
        },
        method: "POST",
        body: JSON.stringify({ complaint: complaintData }),
      }
    );

    const data = await res.json();

    console.log(data);
  };

  console.log(complaints);

  return (
    <div className="App">
      <h2>Insurerity Complaints</h2>

      <div>
        {complaints &&
          complaints.map((complaint) => (
            <div key={complaint.id}>
              <h2>Complaint: {complaint.complaint}</h2>
            </div>
          ))}
      </div>

      {/* create complaint */}

      <div>
        <form onSubmit={onComplaintSubmit}>
          <input
            type="text"
            placeholder="please state your complaint"
            value={complaintInput}
            onChange={(e) => setComplaintInput(e.target.value)}
          />
          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}

export default App;
