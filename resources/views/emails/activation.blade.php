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

		.button {
			background-color: #008CBA; /* Green */
			border: none;
			color: white;
			padding: 12px 24px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
		}
	</style>
</head>
<body>
	<h3 class="text-center">Terima kasih telah melakukan registrasi, klik link berikut untuk mengaktifkan akun anda.</h3>

	<div class="text-center"><a href="{{ url('activation/'.$activationCode) }}" class="button">Aktifkan Akun</a></div>

	<table>
		<tr>
			<td class="text-center">Hormat kami,</td>
		</tr>
		<tr>
			<td>
				<br>
				<br>
			</td>
		</tr>
		<tr>
			<td class="text-center">Online Shop</td>
		</tr>
	</table>
</body>
</html>
