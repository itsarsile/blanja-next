import crypto from "crypto";
import db from "@/src/db";
import { hash } from "bcryptjs";
import { store_profile, users } from "@/src/db/schema/users";
import { NextResponse } from "next/server";
import { sendEmail } from "@/src/utils/nodemailer";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { email, password, role } = requestBody;
    console.log("🚀 ~ file: route.ts:12 ~ POST ~ email:", email);

    const verifyCode = crypto.randomBytes(32).toString("hex");
    
    const verificationCode = crypto
      .createHash("sha256")
      .update(verifyCode)
      .digest("hex");

    const hashedPassword = await hash(password, 10);

    console.log("🚀 ~ file: route.ts:10 ~ POST ~ role:", role);

    if (role === "seller") {
      const { storeName, phoneNumber, name } = requestBody;

      const [registerSeller] = await db
        .insert(users)
        .values({
          email,
          name,
          password: hashedPassword,
          verification_code: verificationCode,
          role,
        })
        .returning({
          userId: users.id,
          email: users.email,
          verificationCode: users.verification_code,
        });

      await db.insert(store_profile).values({
        store_name: storeName,
        store_phone: phoneNumber,
        user_id: registerSeller.userId,
      });

      if (!registerSeller) {
        return NextResponse.json(
          { message: "Error when registering user." },
          { status: 500 }
        );
      }

      const res = await sendEmail({
        to: registerSeller.email,
        subject: "Blanja Account Verification",
        html: `
          <!doctype html><html ⚡4email data-css-strict><head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;}body {	width:100%;	font-family:arial, "helvetica neue", helvetica, sans-serif;}table {	border-collapse:collapse;	border-spacing:0px;}table td, body, .es-wrapper {	padding:0;	Margin:0;}.es-content, .es-header, .es-footer {	table-layout:fixed;	width:100%;}p, hr {	Margin:0;}h1, h2, h3, h4, h5 {	Margin:0;	line-height:120%;	font-family:arial, "helvetica neue", helvetica, sans-serif;}.es-left {	float:left;}.es-right {	float:right;}.es-p5 {	padding:5px;}.es-p5t {	padding-top:5px;}.es-p5b {	padding-bottom:5px;}.es-p5l {	padding-left:5px;}.es-p5r {	padding-right:5px;}.es-p10 {	padding:10px;}.es-p10t {	padding-top:10px;}.es-p10b {	padding-bottom:10px;}.es-p10l {	padding-left:10px;}.es-p10r {	padding-right:10px;}.es-p15 {	padding:15px;}.es-p15t {	padding-top:15px;}.es-p15b {	padding-bottom:15px;}.es-p15l {	padding-left:15px;}.es-p15r {	padding-right:15px;}.es-p20 {	padding:20px;}.es-p20t {	padding-top:20px;}.es-p20b {	padding-bottom:20px;}.es-p20l {	padding-left:20px;}.es-p20r {	padding-right:20px;}.es-p25 {	padding:25px;}.es-p25t {	padding-top:25px;}.es-p25b {	padding-bottom:25px;}.es-p25l {	padding-left:25px;}.es-p25r {	padding-right:25px;}.es-p30 {	padding:30px;}.es-p30t {	padding-top:30px;}.es-p30b {	padding-bottom:30px;}.es-p30l {	padding-left:30px;}.es-p30r {	padding-right:30px;}.es-p35 {	padding:35px;}.es-p35t {	padding-top:35px;}.es-p35b {	padding-bottom:35px;}.es-p35l {	padding-left:35px;}.es-p35r {	padding-right:35px;}.es-p40 {	padding:40px;}.es-p40t {	padding-top:40px;}.es-p40b {	padding-bottom:40px;}.es-p40l {	padding-left:40px;}.es-p40r {	padding-right:40px;}.es-menu td {	border:0;}s {	text-decoration:line-through;}p, ul li, ol li {	font-family:arial, "helvetica neue", helvetica, sans-serif;	line-height:150%;}ul li, ol li {	Margin-bottom:15px;	margin-left:0;}a {	text-decoration:underline;}.es-menu td a {	text-decoration:none;	display:block;	font-family:arial, "helvetica neue", helvetica, sans-serif;}.es-wrapper {	width:100%;	height:100%;}.es-wrapper-color, .es-wrapper {	background-color:#F6F6F6;}.es-header {	background-color:transparent;}.es-header-body {	background-color:#FFFFFF;}.es-header-body p, .es-header-body ul li, .es-header-body ol li {	color:#333333;	font-size:14px;}.es-header-body a {	color:#2CB543;	font-size:14px;}.es-content-body {	background-color:#FFFFFF;}.es-content-body p, .es-content-body ul li, .es-content-body ol li {	color:#333333;	font-size:14px;}.es-content-body a {	color:#2CB543;	font-size:14px;}.es-footer {	background-color:transparent;}.es-footer-body {	background-color:#FFFFFF;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li {	color:#333333;	font-size:14px;}.es-footer-body a {	color:#FFFFFF;	font-size:14px;}.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li {	line-height:120%;	font-size:12px;	color:#CCCCCC;}.es-infoblock a {	font-size:12px;	color:#CCCCCC;}h1 {	font-size:30px;	font-style:normal;	font-weight:normal;	color:#333333;}h2 {	font-size:24px;	font-style:normal;	font-weight:normal;	color:#333333;}h3 {	font-size:20px;	font-style:normal;	font-weight:normal;	color:#333333;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {	font-size:30px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {	font-size:24px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {	font-size:20px;}a.es-button, button.es-button {	display:inline-block;	background:#31CB4B;	border-radius:30px;	font-size:18px;	font-family:arial, "helvetica neue", helvetica, sans-serif;	font-weight:normal;	font-style:normal;	line-height:120%;	color:#FFFFFF;	text-decoration:none;	width:auto;	text-align:center;	padding:10px 20px 10px 20px;}.es-button-border {	border-style:solid solid solid solid;	border-color:#2CB543 #2CB543 #2CB543 #2CB543;	background:#31CB4B;	border-width:0px 0px 2px 0px;	display:inline-block;	border-radius:30px;	width:auto;}.es-menu amp-img, .es-button amp-img {	vertical-align:middle;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px; text-align:left } h2 { font-size:24px; text-align:left } h3 { font-size:20px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px; text-align:left } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:inline-block } a.es-button, button.es-button { font-size:18px; display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } td.es-m-p0t { padding-top:0px } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } }</style></head>
          <body data-new-gr-c-s-loaded="14.1038.0"><div class="es-wrapper-color"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top"><table class="es-header" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr><td class="es-p20t es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="560" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%" role="presentation"><tr><td align="center" style="font-size: 0px"><amp-img class="adapt-img" src="https://xddniy.stripocdn.email/content/guids/CABINET_0b44f14a3e1f56e1fc7211fa5eaa73483a599ce726c3617913ab0dbb53b05aa2/images/blanja.png" alt style="display: block" width="200" height="98" layout="responsive"></amp-img></td>
          </tr></table></td></tr></table></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr><td class="es-p20t es-p20r es-p20l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="560" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td align="left"><p>Halo,</p><p>Terima kasih telah mendaftar di Blanja, platform belanja online terpercaya kami! Untuk melanjutkan proses pendaftaran dan mengakses akun Anda, harap verifikasi alamat email Anda dengan mengklik tautan verifikasi di bawah ini:</p><p><br></p><p><a href=${process.env.NEXT_PUBLIC_API_URL}/api/verification?email=${registerSeller.email}&verificationCode=${registerSeller.verificationCode}>[Link Verifikasi Email]</a></p><p><br></p>
          <p>Jika Anda tidak dapat mengakses tautan di atas, Anda dapat menyalin dan menempel tautan berikut ke browser web Anda: [Tempel Tautan Manual]</p><p>Terima kasih atas partisipasi Anda. Kami berharap Anda dapat menikmati pengalaman belanja yang menyenangkan di Blanja!</p><p>Salam hangat,</p><p>Tim Blanja</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
        `,
      });
      
      console.log("🚀 ~ file: route.ts:66 ~ POST ~ res:", res)

      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }

    const [registerUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        role,
        verification_code: verificationCode,
      })
      .returning({
        email: users.email,
        verification_code: users.verification_code,
      });

    if (!registerUser) {
      return NextResponse.json(
        { message: "Error when registering user." },
        { status: 500 }
      );
    }

    await sendEmail({
      to: registerUser.email,
      subject: "Blanja Account Verification",
      html: `
        <!doctype html><html ⚡4email data-css-strict><head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;}body {	width:100%;	font-family:arial, "helvetica neue", helvetica, sans-serif;}table {	border-collapse:collapse;	border-spacing:0px;}table td, body, .es-wrapper {	padding:0;	Margin:0;}.es-content, .es-header, .es-footer {	table-layout:fixed;	width:100%;}p, hr {	Margin:0;}h1, h2, h3, h4, h5 {	Margin:0;	line-height:120%;	font-family:arial, "helvetica neue", helvetica, sans-serif;}.es-left {	float:left;}.es-right {	float:right;}.es-p5 {	padding:5px;}.es-p5t {	padding-top:5px;}.es-p5b {	padding-bottom:5px;}.es-p5l {	padding-left:5px;}.es-p5r {	padding-right:5px;}.es-p10 {	padding:10px;}.es-p10t {	padding-top:10px;}.es-p10b {	padding-bottom:10px;}.es-p10l {	padding-left:10px;}.es-p10r {	padding-right:10px;}.es-p15 {	padding:15px;}.es-p15t {	padding-top:15px;}.es-p15b {	padding-bottom:15px;}.es-p15l {	padding-left:15px;}.es-p15r {	padding-right:15px;}.es-p20 {	padding:20px;}.es-p20t {	padding-top:20px;}.es-p20b {	padding-bottom:20px;}.es-p20l {	padding-left:20px;}.es-p20r {	padding-right:20px;}.es-p25 {	padding:25px;}.es-p25t {	padding-top:25px;}.es-p25b {	padding-bottom:25px;}.es-p25l {	padding-left:25px;}.es-p25r {	padding-right:25px;}.es-p30 {	padding:30px;}.es-p30t {	padding-top:30px;}.es-p30b {	padding-bottom:30px;}.es-p30l {	padding-left:30px;}.es-p30r {	padding-right:30px;}.es-p35 {	padding:35px;}.es-p35t {	padding-top:35px;}.es-p35b {	padding-bottom:35px;}.es-p35l {	padding-left:35px;}.es-p35r {	padding-right:35px;}.es-p40 {	padding:40px;}.es-p40t {	padding-top:40px;}.es-p40b {	padding-bottom:40px;}.es-p40l {	padding-left:40px;}.es-p40r {	padding-right:40px;}.es-menu td {	border:0;}s {	text-decoration:line-through;}p, ul li, ol li {	font-family:arial, "helvetica neue", helvetica, sans-serif;	line-height:150%;}ul li, ol li {	Margin-bottom:15px;	margin-left:0;}a {	text-decoration:underline;}.es-menu td a {	text-decoration:none;	display:block;	font-family:arial, "helvetica neue", helvetica, sans-serif;}.es-wrapper {	width:100%;	height:100%;}.es-wrapper-color, .es-wrapper {	background-color:#F6F6F6;}.es-header {	background-color:transparent;}.es-header-body {	background-color:#FFFFFF;}.es-header-body p, .es-header-body ul li, .es-header-body ol li {	color:#333333;	font-size:14px;}.es-header-body a {	color:#2CB543;	font-size:14px;}.es-content-body {	background-color:#FFFFFF;}.es-content-body p, .es-content-body ul li, .es-content-body ol li {	color:#333333;	font-size:14px;}.es-content-body a {	color:#2CB543;	font-size:14px;}.es-footer {	background-color:transparent;}.es-footer-body {	background-color:#FFFFFF;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li {	color:#333333;	font-size:14px;}.es-footer-body a {	color:#FFFFFF;	font-size:14px;}.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li {	line-height:120%;	font-size:12px;	color:#CCCCCC;}.es-infoblock a {	font-size:12px;	color:#CCCCCC;}h1 {	font-size:30px;	font-style:normal;	font-weight:normal;	color:#333333;}h2 {	font-size:24px;	font-style:normal;	font-weight:normal;	color:#333333;}h3 {	font-size:20px;	font-style:normal;	font-weight:normal;	color:#333333;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {	font-size:30px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {	font-size:24px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {	font-size:20px;}a.es-button, button.es-button {	display:inline-block;	background:#31CB4B;	border-radius:30px;	font-size:18px;	font-family:arial, "helvetica neue", helvetica, sans-serif;	font-weight:normal;	font-style:normal;	line-height:120%;	color:#FFFFFF;	text-decoration:none;	width:auto;	text-align:center;	padding:10px 20px 10px 20px;}.es-button-border {	border-style:solid solid solid solid;	border-color:#2CB543 #2CB543 #2CB543 #2CB543;	background:#31CB4B;	border-width:0px 0px 2px 0px;	display:inline-block;	border-radius:30px;	width:auto;}.es-menu amp-img, .es-button amp-img {	vertical-align:middle;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px; text-align:left } h2 { font-size:24px; text-align:left } h3 { font-size:20px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px; text-align:left } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:inline-block } a.es-button, button.es-button { font-size:18px; display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } td.es-m-p0t { padding-top:0px } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } }</style></head>
        <body data-new-gr-c-s-loaded="14.1038.0"><div class="es-wrapper-color"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top"><table class="es-header" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr><td class="es-p20t es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="560" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%" role="presentation"><tr><td align="center" style="font-size: 0px"><amp-img class="adapt-img" src="https://xddniy.stripocdn.email/content/guids/CABINET_0b44f14a3e1f56e1fc7211fa5eaa73483a599ce726c3617913ab0dbb53b05aa2/images/blanja.png" alt style="display: block" width="200" height="98" layout="responsive"></amp-img></td>
        </tr></table></td></tr></table></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr><td class="es-p20t es-p20r es-p20l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="560" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td align="left"><p>Halo,</p><p>Terima kasih telah mendaftar di Blanja, platform belanja online terpercaya kami! Untuk melanjutkan proses pendaftaran dan mengakses akun Anda, harap verifikasi alamat email Anda dengan mengklik tautan verifikasi di bawah ini:</p><p><br></p><p><a href=${process.env.NEXT_PUBLIC_API_URL}/api/verification?email=${registerUser.email}&verificationCode=${registerUser.verification_code}>[Link Verifikasi Email]</a></p><p><br></p>
        <p>Jika Anda tidak dapat mengakses tautan di atas, Anda dapat menyalin dan menempel tautan berikut ke browser web Anda: [Tempel Tautan Manual]</p><p>Terima kasih atas partisipasi Anda. Kami berharap Anda dapat menikmati pengalaman belanja yang menyenangkan di Blanja!</p><p>Salam hangat,</p><p>Tim Blanja</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
      `,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:76 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Error when registering user." },
      { status: 500 }
    );
  }
}
