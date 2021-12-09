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
			color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
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
    <p class="text-center">Konfirmasi pembayaran anda dengan nomor invoice: <span class="font-bold" style="color:#721c24;">{{ $orderInvoice }}</span> kami tolak.</p>
    <div class="callout text-center" style="margin-top: 16px;">
        <p class="text-center" style="margin-bottom: 4px;">Hal ini dikarenakan data konfirmasi pembayaran tidak valid atau tidak ditemukan.</p>
        <p class="text-center font-bold">Terima kasih atas perhatiannya</p>
    </div>
</body>
</html>
