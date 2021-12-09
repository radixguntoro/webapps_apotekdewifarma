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
			background: #fff3cd;
			border: 1px solid #ffeeba;
			color: #856404;
			width: 100%;
		}

		p {
			font-size: 14px;
			line-height: 22px;
		}

		.info>span {
			margin-bottom: 4px;
		}
	</style>
</head>
<body>
	<p>Hai <span class="font-bold">{{ $senderName }}</span>,</h3>
    <p>Terima kasih telah berbelanja di toko kami.</p>
    <p>
        Kami telah menerima pembayaran untuk tagihan/invoice dengan rincian dibawah ini:<br>
        <br>No. Invoice: {{ $orderInvoice }}
        <br>Tanggal Bayar: {{ $paymentDate }}
        <br>Jumlah yang telah dibayar: Rp. {{ rupiah($paymentNominal) }}
        <br>Atas Nama Rekening: {{ $paymentAccount }}
    </p>
    ---------------------------------------------
    <p>
        Sub Total: Rp. {{ rupiah($orderTotalPrice) }}
        <br>Biaya Kirim: Rp. {{ rupiah($orderShippCost) }}
        <br>Total: Rp. {{ rupiah($orderGrandTotal) }}
    </p>
	<p>Terima kasih atas perhatian dan pembayaran yang telah dilakuan.</p>
</body>
</html>


