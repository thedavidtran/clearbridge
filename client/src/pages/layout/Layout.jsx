import { Outlet } from "react-router-dom";
import Card from "../../components/ui/Card";

const Layout = () => {
  return (
    <Card>
      <Card.Body>
        <Outlet />
      </Card.Body>
    </Card>
  );
};

export default Layout;
