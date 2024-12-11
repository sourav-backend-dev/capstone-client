import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed properties
  const properties = [
    {
      "title": "Luxury Condo with Lake View",
      "description": "A stunning luxury condo with panoramic views of the lake. Perfect for those seeking elegance and tranquility in downtown Toronto.",
      "imageUrl": "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Njc4OTc2OTg4MDEzMjI4MDE2/original/10b36350-c282-419d-b9a4-32c9339eaee1.jpeg?im_w=1200,https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Njc4OTc2OTg4MDEzMjI4MDE2/original/feb736ac-a388-4f68-b38a-20f60cf82304.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Njc4OTc2OTg4MDEzMjI4MDE2/original/edc1e285-20ed-46d1-b845-8b7369e3bddf.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Njc4OTc2OTg4MDEzMjI4MDE2/original/7a85e5a4-d1ab-4ab1-82d9-3c32bae8db6a.jpeg?im_w=1200",
      "length": 25.4,
      "breadth": 20.3,
      "city": "Toronto",
      "state": "ON",
      "pincode": "M5A 1A1",
      "price": 1200000.0,
      "bedrooms": 2,
      "bathrooms": 2,
      "parking": true,
      "furnished": true,
      "sold": false,
      "userId": 1
    },
    {
      "title": "Cozy Family Home in Suburbia",
      "description": "A charming 3-bedroom family home located in the peaceful suburbs of Ottawa. Ideal for growing families looking for space and comfort.",
      "imageUrl": "https://a0.muscache.com/im/pictures/667ac204-9027-48ae-9dc3-792523695777.jpg?im_w=1200,https://a0.muscache.com/im/pictures/d27202be-dbb8-43e6-9478-5cea91bc83bc.jpg?im_w=720,https://a0.muscache.com/im/pictures/fcaf1629-703a-4655-aa7a-24b29c70fc02.jpg?im_w=720,https://a0.muscache.com/im/pictures/146fd5d1-abc2-4e1e-9969-4c02f707222c.jpg?im_w=720,https://a0.muscache.com/im/pictures/f2350db8-d85a-4cdd-9d7c-4bcd524842d4.jpg?im_w=720",
      "length": 22.0,
      "breadth": 18.5,
      "city": "Ottawa",
      "state": "ON",
      "pincode": "K1A 0B1",
      "price": 500000.0,
      "bedrooms": 3,
      "bathrooms": 2,
      "parking": true,
      "furnished": false,
      "sold": false,
      "userId": 1
    },
    {
      "title": "Contemporary Loft in Downtown Toronto",
      "description": "A spacious and modern loft in the heart of Toronto. Features high ceilings and an open-plan layout.",
      "imageUrl": "https://a0.muscache.com/im/pictures/miso/Hosting-53296801/original/cf0c3d30-cb31-4938-86fc-a842d05736df.jpeg?im_w=1200,https://a0.muscache.com/im/pictures/0b7cbaa3-dcd3-4145-80da-43421e210c1e.jpg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-53296801/original/1cbecc8f-6e26-425e-af1a-3d4a74062581.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-53296801/original/1cbecc8f-6e26-425e-af1a-3d4a74062581.jpeg?im_w=720",
      "length": 15.0,
      "breadth": 10.0,
      "city": "Toronto",
      "state": "ON",
      "pincode": "M5V 2N8",
      "price": 750000.0,
      "bedrooms": 1,
      "bathrooms": 1,
      "parking": false,
      "furnished": true,
      "sold": false,
      "userId": 1
    },
    {
      "title": "Spacious Family Home with Backyard",
      "description": "A well-maintained 4-bedroom home located in a family-friendly neighborhood in Mississauga, featuring a large backyard and modern amenities.",
      "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1260383435071332701/original/a07abb83-8d42-4f84-919d-9e3cb382b22e.jpeg?im_w=1200,https://a0.muscache.com/im/pictures/hosting/Hosting-1260383435071332701/original/8c993059-bf0d-4de1-a9d2-ca32375cf3c8.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-1260383435071332701/original/d68c605b-3549-4227-bbde-4613d3275348.jpeg?im_w=720",
      "length": 30.0,
      "breadth": 25.0,
      "city": "Mississauga",
      "state": "ON",
      "pincode": "L5B 2K2",
      "price": 950000.0,
      "bedrooms": 4,
      "bathrooms": 3,
      "parking": true,
      "furnished": false,
      "sold": false,
      "userId": 1
    },
    {
      "title": "Historic Home with Modern Features",
      "description": "An elegant historical home with modern updates, located in the heart of Kingston. Featuring 3 spacious bedrooms and a cozy living space.",
      "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMzYxNTEyMjg2ODE5OTkwNQ%3D%3D/original/001714da-a273-44e6-8a99-dff0d79fe67e.jpeg?im_w=720,https://a0.muscache.com/im/pictures/miso/Hosting-1133615122868199905/original/65cac83f-a4a2-4a44-9101-9a6cd25f638f.jpeg?im_w=720,https://a0.muscache.com/im/pictures/miso/Hosting-1133615122868199905/original/65cac83f-a4a2-4a44-9101-9a6cd25f638f.jpeg?im_w=720,https://a0.muscache.com/im/pictures/miso/Hosting-1133615122868199905/original/65cac83f-a4a2-4a44-9101-9a6cd25f638f.jpeg?im_w=720",
      "length": 18.0,
      "breadth": 14.0,
      "city": "Kingston",
      "state": "ON",
      "pincode": "K7L 3W1",
      "price": 600000.0,
      "bedrooms": 3,
      "bathrooms": 2,
      "parking": true,
      "furnished": false,
      "sold": false,
      "userId": 1
    },
    {
      "title": "Stylish 2-Bedroom Condo",
      "description": "A chic 2-bedroom condo located in the heart of Hamilton, ideal for young professionals or small families.",
      "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1019132161287741711/original/1a433be3-d832-4fac-a8e8-30ffa6d7dc27.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-1019132161287741711/original/f81d0e00-a922-4b41-9140-9fd4b22d14d3.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-1019132161287741711/original/79efd398-d8f4-4866-a667-55e5cfcfbcf4.jpeg?im_w=720,https://a0.muscache.com/im/pictures/hosting/Hosting-1019132161287741711/original/fc9b6a79-f1c5-46e9-9986-df22a65abc6b.jpeg?im_w=1200",
      "length": 18.5,
      "breadth": 15.0,
      "city": "Hamilton",
      "state": "ON",
      "pincode": "L8P 4X1",
      "price": 420000.0,
      "bedrooms": 2,
      "bathrooms": 1,
      "parking": false,
      "furnished": true,
      "sold": false,
      "userId": 1
    },
    {
      "title": "Charming Cottage on the Lake",
      "description": "This serene cottage on Lake Ontario is the perfect getaway. It has 2 bedrooms and breathtaking lake views.",
      "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1042588454866268032/original/f0cbac9a-ad54-4b6e-851e-64f7c6d6f7b9.jpeg?im_w=1200,https://a0.muscache.com/im/pictures/hosting/Hosting-1042588454866268032/original/f0cbac9a-ad54-4b6e-851e-64f7c6d6f7b9.jpeg?im_w=1200,https://a0.muscache.com/im/pictures/b5805ff0-188e-468e-9e17-2e0e3fab95e1.jpg?im_w=720,https://a0.muscache.com/im/pictures/b5805ff0-188e-468e-9e17-2e0e3fab95e1.jpg?im_w=720",
      "length": 12.0,
      "breadth": 10.0,
      "city": "Toronto",
      "state": "ON",
      "pincode": "M4X 1A3",
      "price": 850000.0,
      "bedrooms": 2,
      "bathrooms": 1,
      "parking": true,
      "furnished": true,
      "sold": false,
      "userId": 1
    }
  ];  

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }

  console.log("Properties seeded!");
}

main()
  .then(() => {
    console.log("Seeding completed.");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Seeding error:", e);
    prisma.$disconnect();
    process.exit(1);
  });
