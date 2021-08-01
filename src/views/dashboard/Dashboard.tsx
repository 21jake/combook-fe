import React from 'react';
import Navbars from '../base/navbars/Navbars';
import Jumbotrons from '../base/jumbotrons/Jumbotrons';
import Collapses from '../base/collapses/Collapses';
import ButtonGroups from '../buttons/button-groups/ButtonGroups';
import AdvancedTables from '../tables/advanced-tables/AdvancedTables';
import { RouteComponentProps } from 'react-router-dom';

/*
Anh em import và preview thêm về các component của CoreUI, sau này Backend có dữ liệu thì lắp thêm vào
*/

interface IDashboard extends RouteComponentProps {}

const Dashboard = (props: IDashboard) => {
  return (
    <>
      <AdvancedTables />
      <Navbars />
      <Jumbotrons />
      <Collapses />
      <ButtonGroups />
    </>
  );
};

export default Dashboard;
