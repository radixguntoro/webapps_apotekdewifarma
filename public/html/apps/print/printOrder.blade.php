<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Cetak Transaksi Penjualan</title>
        <style>
            .table-header, table {
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
            }

            .table-header > tbody > tr > td {
                border: 0;
                vertical-align: top;
            }
            .table-shipping > tbody > tr > td {
                padding: 4px 0;
                vertical-align: top;
            }

            .table-content > thead > tr > th, .table-content > tbody > tr > td, .table-content > tfoot > tr > td {
                padding: 8px;
                border: 1px solid #333;
                vertical-align: top;
            }

            .text-center {
                text-align: center;
            }

            .text-right {
                text-align: right;
            }

            .text-uppercase {
                text-transform: uppercase;
            }

            .text-capitalize {
                text-transform: capitalize;
            }

            .font-bold {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <table class="table-header" style="margin-bottom: 36px;">
            <tbody>
                <tr>
                    <td>
                        <img src="{{ asset('public/frontend/img/logo/logo.png') }}" width="225">
                    </td>
                    <td class="text-right">
                        {{ date('d M Y') }}
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table-shipping" style="margin-bottom: 24px;">
            <tbody>
                <tr>
                    <td width="80" class="font-bold">Nama Pengirim</td>
                    <td width="10">:</td>
                    <td class="text-capitalize">Alexa Sport</td>
                </tr>
                <tr>
                    <td colspan="4">
                        <br>
                        <div class="font-bold" style="height: 24px;">
                            Tujuan Pengiriman
                        </div>
                    </td>
                </tr>
                <tr>
                    <td width="80">Nama Tujuan</td>
                    <td width="10">:</td>
                    <td class="text-capitalize">{{ $data_customer->first_name }} {{ $data_customer->last_name }}</td>
                    <td width="150" class="text-right">No. Invoice</td>
                    <td width="20" class="text-center">:</td>
                    <td class="text-uppercase text-right font-bold" width="80">{{ $data_sales_order->code }}</td>
                </tr>
                <tr>
                    <td width="80">Alamat Tujuan</td>
                    <td width="10">:</td>
                    <td class="text-capitalize">
                        {{ $data_sales_order->dest_address }},
                        Kec. {{ $data_sales_order->dest_subdistrict }} <div class="font-bold">{{ $data_sales_order->dest_city }}</div>
                    </td>
                    <td width="150" class="text-right">Waktu Order</td>
                    <td width="20" class="text-center">:</td>
                    <td class="text-right font-bold" width="80">{{ date('d M Y h:i:s', strtotime($data_sales_order->created_at)) }}</td>
                </tr>
                <tr>
                    <td width="80">No. Telp</td>
                    <td width="10">:</td>
                    <td class="text-capitalize">{{ $data_customer->phone }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table-content">
            <thead>
                <tr>
                    <th class="text-center">No. </th>
                    <th class="text-center">Nama Produk</th>
                    <th class="text-center">Harga</th>
                    <th class="text-center">Kuantitas</th>
                    <th class="text-center">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data_sales_order_detail as $key => $val_order)
                    @foreach ($data_product as $val_product)
                        @if ($val_product->id == $val_order->product_id)
                            <tr>
                                <td width="10">{{ $key + 1 }}</td>
                                <td>
                                    <div class="font-bold">
                                        {{ $val_product->name }}
                                    </div>
                                    <div>
                                        Ukuran: <span class="font-bold">{{ $val_order->product_size }}</span>
                                    </div>
                                </td>
                                <td class="text-right" width="100">{{ rupiah($val_order->price) }}</td>
                                <td class="text-right" width="72">{{ rupiah($val_order->qty) }}</td>
                                <td class="text-right" width="100">{{ rupiah($val_order->subtotal) }}</td>
                            </tr>
                        @endif
                    @endforeach
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-right font-bold" style="border:0">Total :</td>
                    <td class="text-right" style="border:0">{{ rupiah($data_sales_order->total_price) }}</td>
                </tr>
                <tr>
                    <td colspan="4" class="text-right font-bold" style="border:0">Biaya Kirim :</td>
                    <td class="text-right" style="border:0; border-bottom: 2px solid #333">{{ rupiah($data_sales_order->shipping_cost) }}</td>
                </tr>
                <tr>
                    <td colspan="4" class="text-right font-bold" style="border:0">Grand Total :</td>
                    <td class="text-right" style="border:0; background: #ccc">{{ rupiah($data_sales_order->grand_total) }}</td>
                </tr>
            </tfoot>
        </table>
    </body>
</html>
