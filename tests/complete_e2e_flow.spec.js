import { test, expect } from '../data/fixture';
import { faker } from '@faker-js/faker';
import { NavigationPage } from '../pages/navigation/NavigationPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { PaymentPage } from '../pages/PaymentPage';
import { onContactUsPage } from '../pages/ContactUsPage';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import { address as userAddress } from '../data/address.js';
import fetch from 'cross-fetch';


let homePage;
let onNavigationPage;
let onProductPage;
let onCheckoutPage;
let onLoginPage;
let onSignUpPage;
let onAccountCreated;
let onPaymentPage;

test.beforeAll(async () => {
    // Load adblocker engine
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
  
    // Make the blocker globally available
    global.blocker = blocker;
  });

test.beforeEach(async ({ page, blocker }) => {
    homePage = new HomePage(page);
    onNavigationPage = new NavigationPage(page);
    onProductPage = new ProductPage(page);
    onCheckoutPage = new CheckoutPage(page);
    onLoginPage = new LoginPage(page);
    onSignUpPage = new SignupPage(page);
    onAccountCreated = new AccountCreatedPage(page);
    onPaymentPage = new PaymentPage(page);

    // Enable adblocker on the page
    await blocker.enableBlockingInPage(page);

    await homePage.visit(page);
});

test.only('should allow a user to complete the checkout process', async ({ page }) => {
  const onNavigationPage = new NavigationPage(page);
  await onNavigationPage.scrollToCenter();

  console.log('Selecting view product');
  await homePage.selectViewProduct('Premium Polo T-Shirts');
  
  console.log('Adding items to the cart');
  await onProductPage.addToCart('30');

  console.log('Proceeding to checkout');
  await onProductPage.proceedToCheckout();
  await onCheckoutPage.validateTotalValue();
  await onCheckoutPage.continueToRegisterOrLogin();

  console.log('Registering a new user');
  await onLoginPage.registerUser(faker.person.fullName(), faker.internet.email());
  await onSignUpPage.registerUser(userAddress, faker.internet.password());
  await onAccountCreated.clickOnContinueToCart();

  console.log('Navigating to the cart page');
  await onNavigationPage.goToCartPage();
  await onCheckoutPage.proceedToCheckout();

  console.log('Adding a comment and placing the order');
  await onCheckoutPage.addCommentAndPlaceOrder();

  console.log('Filling in credit card information');
  const currentYear = new Date().getFullYear();
  const year = Math.floor(Math.random() * 10) + currentYear + 1;
  const cardInfo = {
    nameOnCard: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber(),
    cvc: faker.finance.creditCardCVV(),
    expiryMonth: Math.floor(Math.random() * 12) + 1,
    expiryYear: year
  };

  await onPaymentPage.fillCreditCardInfo(cardInfo);
  await onPaymentPage.clickContinueButton(page);

  await onPaymentPage.getMessageFromAlert();
});