/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// services
import findLastTrimester from '../functions/findLastTrimester';
import getAllLivesQt from '../services/getAllLivesQt';
import getUsers from '../services/getUsers';
import getAllCompanysQt from '../services/getAllCompanysQt';
import getFinancialData from '../services/getFinancialData';
import filterDataOfBiling from '../functions/filterDataOfBiling';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState();
  const [companys, setCompanys] = useState();
  const [currentBilling, setCurrentBilling] = useState();
  const [lastTrimesterBilling, setLastTrimesterBilling] = useState();
  const [users, setUsers] = useState({
    Vale: 0,
    GPA: 0,
    Santander: 0,
    Safra: 0,
    Dasa: 0,
    BRQ: 0,
    Fleury: 0,
    CBMM: 0,
    Hypera: 0,
    GFT: 0
  });
  const [filteredDataOfBilling, setfilteredDataOfBilling] = useState({
    filterByDates: [0],
    monthlyBillings: [0],
    filterByProductNames: 0
  });


  async function getCompanyUsers() {
    const companiesArray = [
      'Vale',
      'GPA',
      'Santander',
      'Safra',
      'Dasa',
      'BRQ',
      'Fleury',
      'CBMM',
      'Hypera',
      'GFT'];

    const obj = {};

    for (let i = 0; i < companiesArray.length; i += 1) {
      const companiesUsers = (await getUsers(companiesArray[i])).quantidade;
      obj[companiesArray[i]] = companiesUsers;
    }

    setUsers(obj);
  }

  useEffect(() => {
    async function fetchData() {
      const allLivesQt = await getAllLivesQt();
      const AllCompanysQt = await getAllCompanysQt();
      const currentBilling = await getFinancialData();
      const lastTrimesterBilling = await findLastTrimester();

      await getCompanyUsers();

      setLives(allLivesQt);
      setCompanys(AllCompanysQt);
      setCurrentBilling(currentBilling.total_billing.financeiro_valor);
      setLastTrimesterBilling(lastTrimesterBilling);

      const filtered = await filterDataOfBiling();
      setfilteredDataOfBilling(filtered);
    }
    fetchData();
    // setTimeout(() => {
      setLoading(false);
    // }, "6000")
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Flashvolve </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bem-vindo
        </Typography>
        {
          loading ? 'Carregando...' :
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Vidas" total={lives} icon={'ic:baseline-group'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Faturamento ??ltimo Trimestre" total={lastTrimesterBilling} color="info" icon={'ic:baseline-assessment'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Faturamento Atual" total={currentBilling} color="warning" icon={'ic:baseline-auto-graph'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Empresas" total={companys} color="error" icon={'ic:baseline-supervised-user-circle'} />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title="Faturamento por produto"
                  // subheader="(+43%) que o ??ltimo ano"
                  chartLabels={filteredDataOfBilling.filterByDates}
                  chartData={[
                    {
                      name: filteredDataOfBilling.filterByProductNames[0],
                      type: 'area',
                      fill: 'gradient',
                      data: filteredDataOfBilling.monthlyBillings[0],
                    },
                    {
                      name: filteredDataOfBilling.filterByProductNames[1],
                      type: 'line',
                      fill: 'solid',
                      data: filteredDataOfBilling.monthlyBillings[1],
                    },
                    {
                      name: filteredDataOfBilling.filterByProductNames[2],
                      type: 'column',
                      fill: 'solid',
                      data: filteredDataOfBilling.monthlyBillings[2],
                    }
                    ,
                    {
                      name: filteredDataOfBilling.filterByProductNames[3],
                      type: 'column',
                      fill: 'gradient',
                      data: filteredDataOfBilling.monthlyBillings[3],
                    }
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Produtos"
                  chartData={[
                    { label: 'Social', value: 4344 },
                    { label: 'Comunica????o', value: 5435 },
                    { label: 'Sa??de & Seguran??a', value: 1443 },
                    { label: 'Automa????o Criativa', value: 4443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Usu??rios por Cliente"
                  // subheader="(+43%) que o ??ltimo ano"
                  chartData={[
                    { label: 'Vale', value: users.Vale },
                    { label: 'GPA', value: users.GPA },
                    { label: 'Santander', value: users.Santander },
                    { label: 'Safra', value: users.Safra },
                    { label: 'Dasa', value: users.Dasa },
                    { label: 'BRQ', value: users.BRQ },
                    { label: 'Fleury', value: users.Fleury },
                    { label: 'CBMM', value: users.CBMM },
                    { label: 'Hypera', value: users.Hypera },
                    { label: 'GFT', value: users.GFT },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentSubject
                  title="Faturamento por Trimestre"
                  chartLabels={['Comunica????o', 'Sa??de & Seguran??a', 'Automa????o Criativa', 'Social', 'Pagamentos', 'Vendas Preditivas']}
                  chartData={[
                    { name: '1?? Tri', data: [80, 50, 30, 40, 100, 20] },
                    { name: '2?? Tri', data: [20, 30, 40, 80, 20, 80] },
                    { name: '3?? Tri', data: [44, 76, 78, 13, 43, 10] },
                  ]}
                  chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppNewsUpdate
                  title="??ltimas atualiza????es"
                  list={[...Array(5)].map((_, index) => ({
                    id: faker.datatype.uuid(),
                    title: faker.name.jobTitle(),
                    description: faker.name.jobTitle(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                  }))}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppOrderTimeline
                  title="??ltimas vendas"
                  list={[...Array(5)].map((_, index) => ({
                    id: faker.datatype.uuid(),
                    title: [
                      '1983, orders, $4220',
                      '12 Invoices have been paid',
                      'Order #37745 from September',
                      'New order placed #XF-2356',
                      'New order placed #XF-2346',
                    ][index],
                    type: `order${index + 1}`,
                    time: faker.date.past(),
                  }))}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppTrafficBySite
                  title="Tr??fego no Site"
                  list={[
                    {
                      name: 'FaceBook',
                      value: 323234,
                      icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                    },
                    {
                      name: 'Google',
                      value: 341212,
                      icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                    },
                    {
                      name: 'Linkedin',
                      value: 411213,
                      icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                    },
                    {
                      name: 'Twitter',
                      value: 443232,
                      icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppTasks
                  title="Tarefas"
                  list={[
                    { id: '1', label: 'Create FireStone Logo' },
                    { id: '2', label: 'Add SCSS and JS files if required' },
                    { id: '3', label: 'Stakeholder Meeting' },
                    { id: '4', label: 'Scoping & Estimations' },
                    { id: '5', label: 'Sprint Showcase' },
                    { id: '6', label: 'Sprint Showcase' },
                  ]}
                />
              </Grid>
            </Grid>
        }
      </Container>
    </>
  );
}
