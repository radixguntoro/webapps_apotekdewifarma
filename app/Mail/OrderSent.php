<?php

namespace App\Mail;

use App\User;
use App\Model\SalesOrder;
use App\Model\PaymentConfirmation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderSent extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $order;

    public function __construct(SalesOrder $order, $payment, $customer)
    {
        $this->customer = $customer;
        $this->order = $order;
        $this->payment = $payment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.orderSent')
                    ->with([
                        'senderName' => $this->customer->first_name." ".$this->customer->last_name,
                        'orderInvoice' => $this->order->code,
                        'orderTotalPrice' => $this->order->total_price,
                        'orderShippCost' => $this->order->shipping_cost,
                        'orderGrandTotal' => $this->order->grand_total,
                        'paymentDate' => $this->payment->transfer_date,
                        'paymentNominal' => $this->payment->transfer_nominal,
                        'paymentAccount' => $this->payment->account_name
                    ]);
    }
}
