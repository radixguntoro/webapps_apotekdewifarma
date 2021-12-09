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
			margin: 8px;
		}

		.info>span {
			margin-bottom: 4px;
		}
	</style>
</head>
<body>
	<h3 style="text-align: center; font-weight: normal; margin-bottom: 0;">Terima kasih telah mengunjungi toko kami, berikut ini tagihan yang harus anda bayar.</h3>
	<h3 style="text-align: center;">No. Invoice: <span style="color: #2795b6; font-size: 16px;">{{ $orderInvoice }}</span></h3>
	<table>
		<thead style="background:#ddd;">
			<tr>
				<th class="text-right" colspan="3" style="border: 0; background: white;"><span class="font-bold">Tanggal :</span>&nbsp;<span>{{ mediumDate($orderDate) }}</span></th>
			</tr>
			<tr>
				<th class="text-center">Produk</th>
				<th class="text-center">Diskon</th>
				<th class="text-center">Subtotal</th>
			</tr>
		</thead>
		<tbody>
			@foreach ($orderDetail as $val_item)
				<tr>
					<td>
						<div class="font-bold" style="margin-bottom: 2px; font-size: 14px;">{{ $val_item->name }}</div>
						<div style="margin-bottom: 8px;">Rp. {{ rupiah($val_item->price) }}</div>
						<div><span>Ukuran :</span>&nbsp;<span>{{ $val_item->options->size }}</span></div>
						<div><span>Qty :</span>&nbsp;<span>{{ $val_item->qty }}</span></div>
					</td>
					<td class="text-center">{{ $val_item->options->discount * 100 }} %</td>
					<td class="text-right" width="150">{{ rupiah($val_item->qty * $val_item->price) }}</td>
				</tr>
			@endforeach
		</tbody>
		<tfoot>
			<tr>
				<td colspan="2" class="text-right">Total :</td>
				<td class="text-right font-bold">{{ rupiah($orderTotalPrice) }}</td>
			</tr>
			<tr>
				<td colspan="2" class="text-right">Biaya Kirim :</td>
				<td class="text-right font-bold" style="border-bottom: 1px solid #333">{{ rupiah($orderShippCost) }}</td>
			</tr>
			<tr>
				<td colspan="2" class="text-right">Grand Total :</td>
				<td class="text-right font-bold" style="border-bottom: 1px double #333; background: #ddd">Rp. {{ rupiah($orderGrandTotal) }}</td>
			</tr>
		</tfoot>
	</table>
	<div class="info">
		<div>
			<span class="font-bold">Nama:</span>&nbsp;<span>{{ $senderName }}</span>
		</div>
		<div>
			<span class="font-bold">Alamat Pengiriman:</span>&nbsp;<span>{{ $senderAddress }}</span>
		</div>
		<div>
			<span class="font-bold">Kurir:</span>&nbsp;<span class="text-uppercase">{{ $orderShippCour }}</span>
		</div>
		<div>
			<span class="font-bold">Jenis Paket:</span>&nbsp;<span>{{ $orderShippServ }}</span>
		</div>
		<div>
			<span class="font-bold">Estimasi Pengiriman:</span>&nbsp;<span>{{ $orderShippEta }}</span>
		</div>
	</div><br>
	------------------------------------------------
	<div class="info">
		<span>Pembayaran dapat dikirim melalui rekening :</span><br><br>
		<div>
			<span>Bank BCA:</span>&nbsp;<span class="font-bold">258-184-1291</span>
		</div>
		<div>
			<span>Atas Nama:</span>&nbsp;<span>PT. Online Shop</span>
		</div>
		<br>
		<div>
			<span>Bank Mandiri:</span>&nbsp;<span class="font-bold">145-000-5245150</span>
		</div>
		<div>
			<span>Atas Nama:</span>&nbsp;<span>PT. Online Shop</span>
		</div>
	</div>
	<div class="callout text-center">
		<p class="text-center" style="margin-bottom: 4px;">Apabila anda tidak melakukan pembayaran dalam waktu 1x24 jam, maka transaksi akan otomatis dibatalkan.</p>
      	<p class="text-center font-bold">Terima kasih</p>
	</div>
</body>
</html>
