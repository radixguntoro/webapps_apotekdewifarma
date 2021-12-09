<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<style type="text/css" media="screen">
		.text-center {
			text-align: center;
		}

		.text-right {
			text-align: right;
		}

		.text-left {
			text-align: left;
		}

		.text-uppercase {
			text-transform: uppercase;
		}

		.font-bold {
			font-weight: bold;
		}

		table {
			width: 100%;
			border-collapse: collapse;
		}

		table > thead > tr > th {
			border: 1px solid #ccc;
			padding: 8px 12px;
			border-right: 0;
			border-left: 0;
		}

		table > tbody > tr > td {
			border-bottom: 1px solid #ccc;
			padding: 8px 12px;
		}

		table > tfoot > tr > td {
			padding: 8px 12px;
		}

		.info {
			margin-top: 12px;
			font-size: 14px;
		}

		.callout {
			margin-top: 16px;
			padding: 8px 16px;
			color: #155724;
			background-color: #d4edda;
			border-color: #c3e6cb;
			width: 100%;
		}

		p {
			font-size: 14px;
		}

		.info>span {
			margin-bottom: 4px;
		}
	</style>
</head>
<body>
	<p>Hai <span class="font-bold">{{ $senderName }}</span>,</h3>
    <h3 class="text-center">Berita baik pesanan anda dengan nomor invoice: <span class="font-bold" style="color:#155724;">{{ $orderInvoice }}</span> telah sampai, Apakah anda sudah menerimanya?</h3>
    <div class="callout text-center" style="margin-top: 16px;">
        <p class="text-center" style="margin-bottom: 4px;">Apabila anda sudah menerima pesanan anda, tolong klik tombol <span class="font-bold">selesai</span> pada order anda dan kami tunggu orderan anda selanjutnya</p>
        <p class="text-center font-bold">Terima kasih</p>
    </div>
</body>
</html>
