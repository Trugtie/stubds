import "./CustomerManagement.css";
import CustomerTable from "../../Components/Tables/CustomerTable/CustomerTable";
import RequirementTable from "../../Components/Tables/CustomerTable/RequirementTable";

function CustomerManagement() {
  return (
    <div className="CustomerManagement-container">
      <CustomerTable />
      <br/>
      <RequirementTable />
    </div>
  );
}

export default CustomerManagement;
