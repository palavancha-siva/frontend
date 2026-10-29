# fin_user_webapp

Modern React & Redux customer-facing loan portal and eligibility web application.

---

## 📁 Project Structure

```text
fin_user_webapp/
├── .github/
│   └── workflows/
│       ├── deploy-dev.yml
│       ├── deploy-staging.yml
│       └── deploy-prod.yml
├── deploy/
│   ├── docker-compose.dev.yml
│   └── docker-compose.prod.yml
├── e2e/
│   ├── journey.spec.js
│   ├── qaPortal.spec.js
│   ├── testNumbers.spec.js
│   └── helpers.js
├── tests/
│   ├── profileForm.test.js
│   ├── creditReport.test.js
│   ├── crypto.test.js
│   └── myDocuments.test.js
├── public/
│   ├── index.html
│   ├── favicons/
│   ├── loader.gif
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── index.js              # Application entry point
│   ├── App.js                # Root component & routing
│   ├── store.js              # Redux store configuration
│   ├── reducers.js           # Root reducer combining modules
│   ├── sagas.js              # Root redux-saga watcher
│   ├── history.js            # Browser history navigation helper
│   ├── utils.js              # Shared utility functions
│   ├── actions/              # Redux action creators, types, reducers & sagas
│   │   ├── auth/             # auth.js, index.js, reducer.js, saga.js
│   │   ├── eligibility/      # eligibility.js, index.js, reducer.js, saga.js
│   │   ├── portal/           # portal.js, index.js, reducer.js, saga.js
│   │   └── settings/         # settings.js, index.js, reducer.js, saga.js
│   ├── components/           # Feature components with scoped CSS
│   │   ├── Auth/             # Login, Signup, VerifyOtp, AlreadyRegistered, CheckCreditScore, useSendOtp
│   │   ├── Dashboard/        # Dashboard, ApplicationCard, CardCarousel, CibilCard, ExistingLoans, OffersTable
│   │   ├── Application/      # LoanApplication, ApplicationProgress, ProgressTimeline, DocumentCard
│   │   ├── Applications/     # MyApplications, applicationsView
│   │   ├── Eligibility/      # CheckEligibility, ChooseOption
│   │   ├── Calculator/       # EligibilityCalculator
│   │   ├── Cibil/            # CheckCibil, CreditReport
│   │   ├── Offers/           # CompleteDetails
│   │   ├── Profile/          # Profile, ProfileSections, profileForm, MyDocuments, documentFiles
│   │   ├── ComingSoon/       # ComingSoon
│   │   ├── Layout/           # AppLayout, AuthSplitLayout
│   │   ├── Common/           # Routes, Btn, Loader, ErrorBoundary, IdleLogout, ScoreGauge, NotFound
│   │   └── inputs/           # FormInput, FormSelect, FormRadio, FormCheckbox, FormDatePicker, MobileInput, OtpInput, PanInput
│   ├── config/               # APIs.js, Axios.js, useAxios.js, useMasters.js, crypto.js, journey.js, Images.js
│   ├── helpers/              # creditReport.js, pageMeta.js
│   ├── utils/                # authStorage.js, sessionStore.js
│   └── assets/
│       ├── css/common.css
│       └── images/finkuby_logo.png
├── webpack.config.js
├── .babelrc
├── eslint.config.js
├── .prettierrc
├── playwright.config.js
├── Dockerfile
├── nginx.conf.template
├── docker-compose.prod.yml
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation
```bash
npm install
```

### Environment Configuration
Copy `.env.example` to `.env` and fill in the required API endpoints:
```bash
cp .env.example .env
```

### Development Server
```bash
npm start
# or
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🧪 Testing

### Unit Tests (Jest)
```bash
npm test
```

### End-to-End Tests (Playwright)
```bash
npm run test:e2e
```

---

## 🐳 Docker Deployment

### Production container build
```bash
docker build -t fin_user_webapp:latest .
docker-compose -f docker-compose.prod.yml up -d
```
