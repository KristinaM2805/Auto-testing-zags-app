export async function getAdminByStaffId(client, staffId) {
  const result = await client.query(
    `
      SELECT *
      FROM reg_office.staff
      WHERE staffid = $1
    `,
    [staffId]
  );

  return result.rows[0];
}


export async function getApplicantByPassport(client, passportNumber) {
  const result = await client.query(
    `
      SELECT *
      FROM reg_office.applicants
      WHERE passportnumber = $1
      ORDER BY applicantid DESC
      LIMIT 1
    `,
    [passportNumber]
  );

  return result.rows[0];
}