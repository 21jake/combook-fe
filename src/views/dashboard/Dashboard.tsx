import React from 'react';
// import AdvancedTables from '../tables/advanced-tables/AdvancedTables';
import { RouteComponentProps } from 'react-router-dom';
import ListGroups from '../base/list-groups/ListGroups';


/*
Anh em import và preview thêm về các component của CoreUI, sau này Backend có dữ liệu thì lắp thêm vào
*/

interface IDashboard extends RouteComponentProps {}

const Dashboard = (props: IDashboard) => {
  return (
    <>
      {/* <AdvancedTables />
      <Navbars />
      <Jumbotrons />
      <Collapses />
      <ButtonGroups /> */}
      {/* <Modals/> */}
      <ListGroups/>
    </>
  );
};

export default Dashboard;
