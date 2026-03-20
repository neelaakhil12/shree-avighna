import ProductCard from "@/components/ProductCard";

const allProducts = [
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    prices: { "250ml": 95, "500ml": 185, "1lt": 370, "5lts": 1850, "10lts": 3700, "15lts": 5550 },
    caption: "Carefully Selected Groundnuts, Wood Cold Pressed for Purity",
    description: "Our Groundnut Wood Cold Pressed Oil is made from carefully selected farm-fresh groundnuts, extracted using the traditional wooden ghani (wood cold press) method at low temperatures. This slow and natural process helps retain the oil’s natural nutrients, aroma, and authentic flavor without using heat, chemicals, or preservatives. With its rich taste and natural purity, Shree Avighna Groundnut Oil is a wholesome choice for everyday cooking and traditional recipes, bringing the goodness of farm-fresh ingredients to your kitchen.",
    image: "/products/groundnut.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in monounsaturated and polyunsaturated fats that help maintain balanced cholesterol levels and support overall heart health.",
      "Natural Source of Antioxidants: Contains Vitamin E and natural antioxidants that help protect the body from oxidative stress.",
      "Nourishes Skin: The natural nutrients and Vitamin E present in groundnut oil help support healthy and glowing skin.",
      "Provides Natural Energy: A good source of healthy fats that provide sustained energy for daily activities.",
      "Supports Healthy Metabolism: Helps support digestion and metabolic functions when used as part of a balanced diet.",
      "Enhances Nutrient Absorption: Healthy fats assist the body in absorbing essential fat-soluble vitamins such as Vitamins A, D, E, and K.",
      "Ideal for Everyday Cooking: Its natural stability and rich flavor make it suitable for sautéing, frying, and traditional cooking."
    ]
  },
  {
    id: "white-sesame-oil",
    name: "Hulled White Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Nature’s goodness, traditionally extracted. Cold pressed sesame oil for pure taste and healthy living.",
    description: "White Sesame Seeds (also known as White Til or Safed Til) are small, oil-rich seeds obtained from the plant Sesamum indicum. They are widely used in cooking and are traditionally known for producing high-quality sesame oil through natural wood cold-pressing methods. At Shree Avighna, we use hulled sesame seeds, where the outer husk is removed to reveal smooth off-white seeds with a mild nutty flavor and natural aroma. These premium seeds are commonly used in cooking, sweets, and especially for oil extraction. Due to their naturally high oil content, white sesame seeds are ideal for producing pure wood cold-pressed sesame oil, ensuring rich taste, natural nutrients, and authentic quality in every drop. White sesame seeds are rich in nutrients such as: Healthy fats (monounsaturated & polyunsaturated), Plant protein, Dietary fiber, Calcium, magnesium, and iron, Vitamin B complex and Vitamin E, Natural antioxidants like lignans.",
    image: "/products/white-sesame.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in healthy fats that may help maintain good cholesterol levels and support overall heart health.",
      "Rich in Antioxidants: Contains natural antioxidants like sesamol and sesamin that help protect the body from oxidative stress.",
      "Improves Digestion: Traditionally used in cooking as it helps support better digestion and gut health.",
      "Good for Skin & Hair: Nourishes skin and hair naturally and is commonly used for massage and hair care.",
      "Anti-Inflammatory Properties: Natural compounds in sesame oil may help reduce inflammation in the body.",
      "Strengthens Immunity: Packed with vitamins and minerals that help support the body’s immune system.",
      "Rich in Natural Nutrients: A good source of Vitamin E, healthy fats, and essential minerals."
    ]
  },
  {
    id: "black-sesame-oil",
    name: "Black Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Black Sesame. Wood Pressed. Naturally Powerful.",
    description: "At Shree Avighna, we use premium-quality black sesame seeds to produce pure wood cold-pressed sesame oil. Known for its deep color, strong aroma, and high nutritional value, this oil has been traditionally valued in Indian households for cooking, wellness, and Ayurvedic practices, delivering natural goodness in every drop.",
    image: "/products/black-sesame.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in healthy fats that help maintain balanced cholesterol levels.",
      "High in Antioxidants: Contains natural antioxidants like sesamin and sesamol that help protect cells from damage.",
      "Improves Bone Strength: Black sesame seeds are naturally rich in calcium and minerals that support bone health.",
      "Good for Skin & Hair: Deeply nourishes the skin and strengthens hair when used for massage or hair care.",
      "Supports Digestion: Traditionally used in cooking to help support digestive health.",
      "Natural Energy Booster: Rich in essential nutrients that help support overall wellness and vitality."
    ]
  },
  {
    id: "safflower-oil",
    name: "Safflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Premium Hulled Safflower Seeds – Pure, Clean, and Rich in Natural Oil.",
    description: "Safflower seeds are known for their high content of healthy unsaturated fats, making the oil a preferred choice for everyday cooking and healthy lifestyles. The result is pure, natural, and nutrient-rich safflower oil, bringing traditional goodness and quality to your kitchen. Safflower hulled seeds are carefully cleaned seeds of the safflower plant (Carthamus tinctorius), with the outer husk removed to obtain the inner kernel. These kernels are rich in natural oil and are widely used for producing high-quality wood cold pressed safflower oil.",
    image: "/products/safflower.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in unsaturated fatty acids that may help maintain healthy cholesterol levels.",
      "Light and Healthy Cooking Oil: Has a light texture and mild flavor, making it suitable for everyday cooking.",
      "Rich in Antioxidants: Contains Vitamin E and natural antioxidants that help protect the body from oxidative stress.",
      "Helps Maintain Healthy Skin: Nourishes the skin and helps keep it soft and hydrated.",
      "Supports Weight Management: Low in saturated fats and often preferred in balanced diets.",
      "Promotes Overall Wellness: Provides essential nutrients that support general health and well-being."
    ]
  },
  {
    id: "sunflower-oil",
    name: "Sunflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Light, Healthy, and Naturally Nourishing – That's Sunflower Oil.",
    description: "At Shree Avighna, premium-quality sunflower seeds are used to produce pure wood cold-pressed sunflower oil. Known for its light color, delicate taste, and nutritional benefits, this oil is ideal for everyday cooking while maintaining the natural goodness of the seeds.",
    image: "/products/sunflower.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in healthy unsaturated fats that help support balanced cholesterol levels.",
      "High in Vitamin E: A good source of Vitamin E, which acts as a natural antioxidant and supports skin and immune health.",
      "Light and Easy to Digest: Its light texture makes it suitable for everyday cooking and easy digestion.",
      "Good for Skin Health: Helps nourish the skin and maintain natural moisture.",
      "Natural Energy Source: Provides essential nutrients that help support overall wellness."
    ]
  },
  {
    id: "badam-oil",
    name: "Badam Oil",
    prices: { "500ml": 0, "1lt": 0, "5lts": 0, "10lts": 0, "15lts": 0 },
    caption: "Nature's Secret for Skin and Hair",
    description: "Pure, unrefined almond oil, traditionally extracted through wood cold pressing, preserves all its natural nutrients and goodness. This gentle, chemical-free process ensures that vitamins, antioxidants, and essential fatty acids remain intact, making it ideal for both dietary and cosmetic use. Renowned for its light, nutty aroma and smooth texture, this oil deeply nourishes the skin, promoting softness, hydration, and a healthy glow. It strengthens hair, reduces breakage, and enhances shine while supporting scalp health. Beyond beauty, regular consumption in small quantities may contribute to overall wellness by supporting heart health, boosting immunity, and improving metabolic balance.",
    image: "/products/badam.png",
    category: "Premium Oils",
    benefits: [
      "Nourishes Skin: Moisturizes deeply, improves complexion, and helps reduce dryness.",
      "Strengthens Hair: Promotes hair growth, adds shine, and prevents hair fall.",
      "Rich in Nutrients: Packed with vitamin E, magnesium, and essential fatty acids.",
      "Supports Heart Health: Helps maintain healthy cholesterol levels and overall cardiovascular wellness.",
      "Boosts Immunity & Energy: Enhances overall vitality and well-being.",
      "Versatile Usage: Apply topically for skin and hair care, consume in small quantities for health, or use for massages and wellness rituals."
    ]
  },
  {
    id: "mustard-oil",
    name: "Mustard Oil",
    prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100, "10lts": 4200, "15lts": 6300 },
    caption: "Pure Strength, Naturally Pressed",
    description: "Mustard seeds are small, round seeds obtained from the mustard plant, widely known for their strong aroma and rich oil content. These seeds have been traditionally used in Indian cooking and are valued for producing pure mustard oil through natural extraction methods. Mustard seeds are naturally rich in oil and essential nutrients, making them ideal for producing pure, flavorful, and nutrient-rich wood cold-pressed mustard oil.",
    image: "/products/mustard.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Contains healthy fats that may help maintain balanced cholesterol levels.",
      "Rich in Natural Antioxidants: Provides antioxidants that help protect the body from oxidative stress.",
      "Aids Digestion: Traditionally used in cooking as it may help stimulate digestion.",
      "Good for Skin & Hair: Helps nourish the skin and strengthen hair when used for massage or hair care.",
      "Natural Warming Properties: Known for its warming effect, commonly used in traditional wellness practices."
    ]
  },
  {
    id: "neem-oil",
    name: "Neem Oil",
    prices: { "250ml": 175, "500ml": 350, "1lt": 700, "5lts": 3500, "10lts": 7000, "15lts": 10500 },
    caption: "Nature's Shield for Skin and Hair.",
    description: "Our refined Neem Oil is extracted from premium quality neem seeds using traditional wood cold pressing, preserving its natural goodness while ensuring a smooth, pure oil. This refined version has a lighter aroma and clarity, making it versatile for cosmetic, therapeutic, and household applications.",
    image: "/products/neem.png",
    category: "Natural Extracts",
    benefits: [
      "Skin Care: Helps soothe skin irritations, acne, and rashes.",
      "Hair Care: Strengthens hair roots, reduces dandruff, and promotes healthy scalp.",
      "Pest Control: Natural insect-repellent properties for plants and household use.",
      "Antimicrobial: Supports hygiene and natural antibacterial applications.",
      "Versatile Use: Suitable for external use in hair oils, lotions, soaps, and as a natural pesticide in gardens."
    ]
  },
  {
    id: "kuridi-oil",
    name: "Coconut Oil (Kuridi)",
    prices: { "250ml": 225, "500ml": 450, "1lt": 900, "5lts": 4500, "10lts": 9000, "15lts": 13500 },
    caption: "From Fresh Coconuts to Your Glow",
    description: "Pure, unrefined coconut oil, traditionally wood cold pressed from fresh coconuts (Kurudi), preserving all natural nutrients and aroma. Rich in lauric acid and antioxidants, it nourishes skin, strengthens hair, and supports overall wellness. Its light, tropical fragrance and smooth texture make it ideal for daily hair, skin, and culinary use.",
    image: "/products/kuridi.png",
    category: "Wood Pressed",
    benefits: [
      "Deeply Nourishes Skin: Moisturizes and softens skin, improving texture and hydration.",
      "Strengthens Hair: Promotes hair growth, reduces breakage, prevents split ends, and adds natural shine.",
      "Rich in Nutrients: Packed with lauric acid, antioxidants, and essential fatty acids for overall health.",
      "Supports Digestion & Immunity: Can aid digestion and boost overall wellness when consumed in moderation.",
      "Natural & Chemical-Free: Retains all nutrients due to traditional wood cold pressing, free from chemicals or refining.",
      "Soothes & Protects: Helps calm skin irritations and protects against environmental damage.",
      "Versatile Use: Suitable for cooking, hair care, skincare, and massage therapies."
    ]
  },
  {
    id: "flax-seeds-oil",
    name: "Flax Seed Oil",
    prices: { "500ml": 0, "1lt": 0, "5lts": 0, "10lts": 0, "15lts": 0 },
    caption: "Nature's Omega Boost in Every Drop",
    description: "Flax seed oil, extracted from premium flax seeds using traditional wood cold pressing, is a pure and natural oil that retains all its nutrients. This gentle, chemical-free method preserves omega-3 fatty acids, lignans, and antioxidants, making it a wholesome choice for daily consumption. Its light, nutty flavor is ideal for salads, smoothies, and other cold preparations, adding both taste and nutrition to your diet.",
    image: "/products/flax.png",
    category: "Wellness",
    benefits: [
      "Heart Health: Rich in Omega-3 fatty acids to support cardiovascular wellness.",
      "Digestive Support: Helps improve digestion and maintain gut health.",
      "Skin & Hair Care: Nourishes skin, reduces dryness, and strengthens hair.",
      "Antioxidant Properties: Supports overall well-being and combats free radicals.",
      "Versatile Usage: Perfect for daily consumption, salad dressings, smoothies, or as a natural supplement for skin and hair care."
    ]
  },
  {
    id: "castor-oil",
    name: "Castor Oil",
    prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100, "10lts": 4200, "15lts": 6300 },
    caption: "Nature's Elixir for Hair and Skin",
    description: "At Shree Avighna, premium-quality castor seeds are used to produce pure wood cold-pressed castor oil. Known for its thick texture and high nutritional value, castor oil has been traditionally used for hair care, skin care, and wellness practices.",
    image: "/products/castor.png",
    category: "Natural Extracts",
    benefits: [
      "Promotes Hair Growth: Helps nourish the scalp and supports healthy hair growth.",
      "Deeply Moisturizes Skin: Acts as a natural moisturizer that helps keep skin soft and hydrated.",
      "Strengthens Hair: Regular use helps improve hair thickness and strength.",
      "Supports Natural Cleansing: Traditionally used for its natural cleansing and detoxifying properties.",
      "Rich in Natural Nutrients: Contains essential fatty acids that support overall hair and skin health."
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Our Products</h1>
        <p className="text-stone-500 max-w-2xl">
          Browse our collection of 100% natural, wood cold-pressed edible oils and extracts. Pure, healthy, and delivered fresh.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allProducts.map((product, idx) => (
          <div key={product.id} data-aos="fade-up" data-aos-delay={idx * 50}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
