import CustomButton from "../../../components/shared/button/Button";
import data from "./Data.json";
import { ReactComponent as PDF } from "../../../assets/images/Logo.svg";
import { ReactComponent as Setting } from "./settings.svg";
import { ReactComponent as Icon } from "./Icon.svg";
import { ReactComponent as MoreVertical } from "./more-vertical.svg";
import { ReactComponent as ViewList } from "./view-list.svg";
import "./Dashboard.scss";
import ChildDetail from "../../../components/shared/childDetail/ChildDetail";
const OrganizationDashboard = () => {
  console.log(data.Organizations);

  return (
    <div style={{margin:'0px 40px'}} >
      <div className="org-heading" style={{ margin: "20px 30px" }}>
        <h1 style={{ margin: "0px" }}>List of Organizations</h1>
        <CustomButton
          variant="primary"
          showPlusButton={true}
          customStyle={{height:'50px'}}
          onClick={() => {}}
        >
          Create An Organization
        </CustomButton>
      </div>
      {data.Organizations.map((organization, index) => {
        return (
          <>
            <div className="main-container">
              <div className="org-heading" style={{ margin: "20px" }}>
                <div
                  className="org-heading"
                  style={{ justifyContent: "flex-start" }}
                >
                  <div className="user-avatar">
                    {organization?.img ? (
                      <img src={organization.img} alt="User Icon" />
                    ) : (
                      <div className="initials">
                        {organization.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="product-name">
                    <h2>{organization.name}</h2>
                    <p>{organization.url}</p>
                  </div>
                </div>
                <div className="org-heading">
                  <CustomButton
                    variant="secondary"
                    showPlusButton={true}
                    onClick={() => {}}
                    customStyle={{ marginRight: "10px" }}
                  >
                    Products
                  </CustomButton>
                  <Setting
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      backgroundColor: "#F9FAFB",
                    }}
                  />
                  <ViewList
                    style={{
                      padding: "5px",
                      background: "#f3fcfb",
                    }}
                  />
                  <Icon
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      background: "#f3fcfb",
                    }}
                  />
                  <MoreVertical
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      backgroundColor: "#F9FAFB",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
              {organization.apps.map((app, index) => {
                return (
                  <div>
                    <ChildDetail title={app.name} />{" "}
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default OrganizationDashboard;
