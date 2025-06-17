import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        browse: 'Browse',
        login: 'Login',
        signup: 'Sign Up',
      },
      landing: {
        title: 'Welcome to Akotet Art',
        subtitle: 'Discover handcrafted string art inspired by Ethiopian culture',
        featured: 'Featured Products',
        cta: 'Browse All Products',
      },
      product: {
        price: 'Price',
        details: 'View Details',
        description: 'Description',
        category: 'Category',
        size: 'Size',
        quantity: 'Available Quantity',
        select_quantity: 'Select Quantity',
        add_to_cart: 'Add to Cart',
        contact_telegram: 'Contact via Telegram',
        contact_phone: 'Contact via Phone',
        error: 'Failed to load product details',
      },
      dashboard: {
        title: 'Product Catalog',
        search_placeholder: 'Search products...',
        all_categories: 'All Categories',
        all_sizes: 'All Sizes',
        reset_filters: 'Reset Filters',
        no_products: 'No products found',
      },
      auth: {
        login_title: 'Login to Your Account',
        signup_title: 'Create an Account',
        email: 'Email',
        password: 'Password',
        login_error: 'Invalid email or password',
        signup_error: 'Failed to create account',
        no_account: "Don't have an account?",
        has_account: 'Already have an account?',
      },
    },
  },
  am: {
    translation: {
      nav: {
        home: 'ቤት',
        browse: 'ቃኝ',
        login: 'ግባ',
        signup: 'ተመዝገብ',
      },
      landing: {
        title: 'እንኳን ወደ አኮቴት አርት በደህና መጡ',
        subtitle: 'በኢትዮጵያ ባህል ተመስጦ በእጅ የተሰሩ የክር ጥበቦችን ያግኙ',
        featured: 'ተመራጭ ምርቶች',
        cta: 'ሁሉንም ምርቶች ቃኝ',
      },
      product: {
        price: 'ዋጋ',
        details: 'ዝርዝሮችን ተመልከት',
        description: 'መግለጫ',
        category: 'ምድብ',
        size: 'መጠን',
        quantity: 'የሚገኝ ብዛት',
        select_quantity: 'ብዛት ይምረጡ',
        add_to_cart: 'ወደ ጋሪ ጨምር',
        contact_telegram: 'በቴሌግራም ያነጋግሩ',
        contact_phone: 'በስልክ ያነጋግሩ',
        error: 'የምርት ዝርዝሮችን መጫን አልተሳካም',
      },
      dashboard: {
        title: 'የምርት ካታሎግ',
        search_placeholder: 'ምርቶችን ፈልግ...',
        all_categories: 'ሁሉም ምድቦች',
        all_sizes: 'ሁሉም መጠኖች',
        reset_filters: 'ማጣሪያዎችን ዳግም አስጀምር',
        no_products: 'ምንም ምርቶች አልተገኙም',
      },
      auth: {
        login_title: 'ወደ መለያዎ ይግቡ',
        signup_title: 'መለያ ይፍጠሩ',
        email: 'ኢሜይል',
        password: 'የይለፍ ቃል',
        login_error: 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል',
        signup_error: 'መለያ መፍጠር አልተሳካም',
        no_account: 'መለያ የለዎትም?',
        has_account: 'መለያ አለዎት?',
      },
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;