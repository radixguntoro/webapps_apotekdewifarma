<?php

namespace App\Mail;

use App\User;
use App\Model\SalesOrder;
use App\Model\SalesOrderDetail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Cart;

class OrderInvoice extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    
    public $order;

    public function __construct(SalesOrder $order, $cart, $user)
    {
        $this->user = $user;
        $this->order = $order;
        $this->order_detail = $cart;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.orderInvoice')
                    ->with([
                        'senderName' => $this->user->first_name." ".$this->user->last_name,
                        'senderAddress' => $this->order->dest_address." ".$this->order->dest_zip_code.", ".$this->order->dest_city,
                        'orderInvoice' => $this->order->code,
                        'orderDate' => $this->order->created_at,
                        'orderShippCour' => $this->order->courier,
                        'orderShippServ' => $this->order->shipping_type,
                        'orderShippEta' => $this->order->shipping_eta,
                        'orderTotalPrice' => $this->order->total_price,
                        'orderShippCost' => $this->order->shipping_cost,
                        'orderGrandTotal' => $this->order->grand_total,
                        'orderDetail' => $this->order_detail
                    ]);
    }
}
