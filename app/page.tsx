import Dashboard from "@/components/dashboard";

async function getDummyData() {
  // 실제 API 호출을 시뮬레이션하기 위해 약간의 지연을 추가합니다.
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    order: {
      id: "Oe31b70H",
      date: "2023년 11월 23일",
      items: [
        { name: "글리머 램프", quantity: 2, price: 125000 },
        { name: "아쿠아 필터", quantity: 1, price: 49000 },
      ],
      subtotal: 299000,
      shipping: 5000,
      tax: 25000,
      total: 329000,
    },
    customer: {
      name: "이현우",
      email: "hyunwoo@example.com",
      phone: "010-1234-5678",
    },
    shipping: {
      name: "이현우",
      address: "서울특별시 강남구 테헤란로 123",
      zipCode: "06234",
    },
    payment: {
      cardType: "비자",
      cardNumber: "**** **** **** 4532",
    },
  };
}

export default async function Home() {
  const data = await getDummyData();

  return (
    <div className="container mx-auto max-w-xl mt-8">
      <Dashboard
        order={data.order}
        customer={data.customer}
        shipping={data.shipping}
        payment={data.payment}
      />
    </div>
  );
}
