import xlsx from "xlsx";
import { format } from "./formatQuery.js";
import { importTable } from "../models/sqlImport.js";

const ImportData = () => {
  const array = [];
  let excel = xlsx.readFile("diem.xlsx");
  let data = excel.Sheets[excel.SheetNames[0]];
  let arrayStudent = [];
  let arrayDonVi = [];
  let arrayLop = [];
  let arrayDiem = [];

  for (let index = 2; index < 93; index++) {
    const mssv = data[`C${index}`].v;
    const name = data[`B${index}`].v;
    const lop = data[`D${index}`].v;
    const gmail = data[`F${index}`].v;
    const donVi = data[`E${index}`].v;
    const LISTENING = data[`G${index}`].v;
    const READING = data[`H${index}`].v;

    array.push({
      mssv: mssv,
      HoTen: name,
      lop: lop,
      donVi: donVi,
      gmail: gmail,
      password: (Math.random() * 1000000000).toFixed(0),
      LISTENING: LISTENING,
      READING: READING,
    });
  }

  array.forEach((item) => {
    const donVi = item.donVi;
    arrayDonVi.push(donVi);
  });

  arrayDonVi = [...new Set(arrayDonVi)].map((item, index) => {
    return { maDonVi: ++index, tenDonVi: item };
  });

  let arrayDonViTemp = [];

  array.forEach((item) => {
    const lop = item.lop;
    //
    let donViTemp = array.find((arr) => lop === arr.lop).donVi;
    const maDonVi = arrayDonVi.find(
      (donvi) => item.lop === lop && donvi.tenDonVi === donViTemp
    ).maDonVi;

    arrayDonViTemp.push({ maDonVi: maDonVi, lop: lop });
    arrayLop.push(lop);
  });

  arrayLop = [...new Set(arrayLop)].map((item, index) => {
    const maDonVi = arrayDonViTemp.find((donVi) => donVi.lop === item).maDonVi;
    return { maLop: ++index, tenLop: item, maDonVi: maDonVi };
  });

  //
  let arrayLopTemp = [];

  array.forEach((item) => {
    const mssv = item.mssv;
    const HoTen = item.HoTen;
    const Gmail = item.gmail;
    const password = item.password;
    let lopTemp = array.find((arr) => mssv === arr.mssv).lop;
    const maLop = arrayLop.find(
      (lop) => item.mssv === mssv && lop.tenLop === lopTemp
    ).maLop;

    arrayLopTemp.push({ maLop: maLop, mssv: mssv });
    arrayStudent.push({ mssv, HoTen, Gmail, password });
  });

  arrayStudent = [...new Set(arrayStudent)].map((item) => {
    const maLop = arrayLopTemp.find((lop) => lop.mssv === item.mssv).maLop;
    return {
      mssv: item.mssv,
      HoTen: item.HoTen,
      Gmail: item.Gmail,
      password: item.password,
      malop: maLop,
    };
  });

  /*
  //insert data from arrayDonVi to table donVi
  for (let i = 0; i < arrayDonVi.length; i++) {
    importTable('don_vi', format(arrayDonVi[i]));
  }

//insert data from arrayLop to table lop
for (let i = 0; i < arrayLop.length; i++) {
        importTable('lop', format(arrayLop[i]));
}

    //insert data from arrayStudent to table sinhvien
    for (let i = 0; i < arrayStudent.length; i++) {
        importTable('sinhvien', format(arrayStudent[i]));
    }
  */

  //insert data from diem

  let arrayDiemTemp = [];

  array.forEach((item) => {
    const mssv = item.mssv;
    const READING = item.READING;
    const LISTENING = item.LISTENING;

    arrayDiem.push({ mssv: mssv, READING: READING, LISTENING: LISTENING });
    arrayDiemTemp.push({ mssv: mssv });
  });

  arrayDiem = [...new Set(arrayDiem)].map((item, index) => {
    const maSinhVien = arrayDiemTemp.find(
      (diem) => diem.mssv === item.mssv
    ).mssv;
    return {
      ma: ++index,
      READING: item.READING,
      LISTENING: item.LISTENING,
      maSinhVien: maSinhVien,
    };
  });

  //[3,4, 5]
//3<4<5 true
//4,5,3 false
//2 4 5 7 9 ?
//
  //import data diem to table diem
  for (let i = 0; i < arrayDiem.length; i++) {
    importTable("diem", format(arrayDiem[i]));
  }
};


ImportData();
