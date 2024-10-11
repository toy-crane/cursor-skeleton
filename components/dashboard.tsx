"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  zipCode: string;
}

interface PaymentInfo {
  cardType: string;
  cardNumber: string;
}

interface DashboardProps {
  order: OrderDetails;
  customer: CustomerInfo;
  shipping: ShippingInfo;
  payment: PaymentInfo;
}

export default function Dashboard({
  order,
  customer,
  shipping,
  payment,
}: DashboardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            주문 {order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">주문 ID 복사</span>
            </Button>
          </CardTitle>
          <CardDescription>날짜: {order.date}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              주문 추적
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">더 보기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>수정</DropdownMenuItem>
              <DropdownMenuItem>내보내기</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">주문 상세</div>
          <ul className="grid gap-3">
            {order.items.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {item.name} x <span>{item.quantity}</span>
                </span>
                <span>{item.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">소계</span>
              <span>{order.subtotal.toLocaleString()}원</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">배송비</span>
              <span>{order.shipping.toLocaleString()}원</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">세금</span>
              <span>{order.tax.toLocaleString()}원</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">총계</span>
              <span>{order.total.toLocaleString()}원</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">배송 정보</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{shipping.name}</span>
              <span>{shipping.address}</span>
              <span>{shipping.zipCode}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">청구 정보</div>
            <div className="text-muted-foreground">배송 주소와 동일</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">고객 정보</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">고객명</dt>
              <dd>{customer.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">이메일</dt>
              <dd>
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">전화번호</dt>
              <dd>
                <a href={`tel:${customer.phone}`}>{customer.phone}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">결제 정보</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                {payment.cardType}
              </dt>
              <dd>{payment.cardNumber}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          업데이트 <time dateTime={order.date}>{order.date}</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">이전 주문</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">다음 주문</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
