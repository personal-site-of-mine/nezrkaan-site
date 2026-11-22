// Bank Privacy Index: the scoring method.
//
// Each bank has a file in bank-privacy/banks/ that records what was found for every check below,
// with a source for each finding. The score is never typed in by hand: _data/bankPrivacy.js adds it
// up from those findings using the points set here. Change a number here and every bank changes.
//
// The method page (/bank-privacy/method/) is built from this file too, so the page and the maths
// can never disagree.

module.exports = {
  version: "1.0",
  published: "2026-11-21",

  // Why the bank shares your data. Taken from the reason (legal basis) the bank itself gives.
  reasons: {
    legal: {
      label: "Required by law",
      text: "The bank has to do this by law, for example to stop fraud and money laundering or to answer the police and tax offices.",
    },
    account: {
      label: "To run your account",
      text: "Needed to give you the service: making payments, checking who you are, deciding on credit.",
    },
    commercial: {
      label: "Commercial",
      text: "For the bank's own business: marketing, advertising, rewards and partner deals. No law requires it.",
    },
    choice: {
      label: "Only if you ask or agree",
      text: "Happens only when you turn it on or ask for it.",
    },
  },

  criteria: [
    {
      id: "A",
      title: "Data sharing and selling",
      short: "Sharing",
      keyName: "sharing and selling",
      max: 3,
      intro:
        "Only sharing for commercial reasons can lose points. Sharing the law requires, or that is needed to run your account, is listed but costs nothing. Anonymous data counts too: selling it, or giving it to other companies for their business, loses points even when your name has been taken out.",
      checks: [
        {
          id: "A1",
          question: "Does it give your data to other companies for their own marketing?",
          max: 0.5,
          options: {
            no: { points: 0.5, label: "No", says: "doesn't give your data to other companies for their own marketing" },
            consent: { points: 0.5, label: "Only if you agree first", says: "gives your data to other companies for their own marketing only if you agree" },
            optout: { points: 0.25, label: "Yes, unless you opt out", says: "gives your data to other companies for their own marketing unless you opt out" },
            yes: { points: 0, label: "Yes, and you can't stop it", says: "gives your data to other companies for their own marketing, and you can't stop it" },
          },
        },
        {
          id: "A2",
          question: "Does it use your spending to pick the ads and offers you see, including offers from other companies?",
          max: 1,
          options: {
            no: { points: 1, label: "No", says: "doesn't say it uses your spending to choose ads and offers" },
            consent: { points: 1, label: "Only if you agree first", says: "uses your spending to choose ads and offers only if you agree" },
            optout: { points: 0.5, label: "Yes, unless you switch it off", says: "uses your spending to choose ads and offers unless you switch it off" },
            yes: { points: 0, label: "Yes, and you can't stop it", says: "uses your spending to choose ads and offers, and you can't stop it" },
          },
        },
        {
          id: "A3",
          question: "Does it send your details to social media or advertising companies?",
          max: 0.5,
          options: {
            no: { points: 0.5, label: "No" },
            consent: { points: 0.5, label: "Only if you agree first" },
            optout: { points: 0.25, label: "Yes, unless you opt out" },
            yes: { points: 0, label: "Yes, and you can't stop it" },
          },
        },
        {
          id: "A4",
          question: "Does it say whether it sells personal data?",
          max: 0.5,
          options: {
            never: { points: 0.5, label: "Says it never sells it", says: "says it never sells your personal data" },
            silent: { points: 0.25, label: "Doesn't say", says: "doesn't say whether it sells your personal data" },
            sells: { points: 0, label: "Says it sells it, or may", says: "says it sells personal data, or may" },
          },
        },
        {
          id: "A5",
          question: "Does it sell anonymous data about customers, or give it to other companies for their business?",
          max: 0.5,
          options: {
            no: { points: 0.5, label: "No", says: "doesn't sell anonymous data about customers or give it to other companies for their business" },
            silent: { points: 0.25, label: "Doesn't say", says: "doesn't say what it does with anonymous data about customers" },
            yes: { points: 0, label: "Gives it to other companies, or says it may", says: "may give anonymous data about customers to other companies for their business" },
            sells: { points: 0, label: "Sells it, or says it may", says: "sells anonymous data about customers, or says it may" },
          },
        },
      ],
    },
    {
      id: "B",
      title: "Serious incidents in the last 10 years",
      short: "Incidents",
      keyName: "serious incidents",
      max: 2.5,
      intro:
        "An incident counts if customers' personal data was exposed, stolen or handed to the wrong people, or if a regulator or court fined or ordered the bank over privacy or data security. It also has to have made the news: reported by a national news outlet, or the subject of a fine, order or charges published by a regulator, court or prosecutor. A breach notice the bank filed with a regulator doesn't count on its own. Fines about other things, like money laundering, are listed but don't count.",
      incidents: {
        windowYears: 10,
        // incidents older than this count half
        fullWeightYears: 5,
        olderWeight: 0.5,
        levels: {
          3: {
            points: 1,
            label: "Major",
            rule: "1,000,000 people or more affected, or a privacy fine or settlement of 10 million or more (pounds, euros or dollars), or money taken from customers' accounts",
          },
          2: {
            points: 0.5,
            label: "Serious",
            rule: "10,000 people or more affected, or a privacy fine or settlement of 1 million or more, or copies of ID documents or full account records exposed",
          },
          1: {
            points: 0.25,
            label: "Counted",
            rule: "Any other incident that qualifies",
          },
        },
      },
    },
    {
      id: "C",
      title: "Website and app",
      short: "Web & app",
      keyName: "website and app",
      max: 2,
      intro:
        "Trackers are counted with Disconnect's public tracker list, the same list Firefox uses. A tracking company counts if it is on the list as advertising, analytics, social or fingerprinting. App trackers come from Exodus Privacy's report on the Android app. Tools that only report crashes and errors are shown but not counted, on the website or in the app.",
      checks: [
        {
          id: "C1",
          question: "How many tracking companies load on the home page and the login page before you answer the cookie banner?",
          max: 0.75,
          bands: [
            { from: 0, to: 0, points: 0.75, label: "None" },
            { from: 1, to: 2, points: 0.5, label: "1 or 2" },
            { from: 3, to: 5, points: 0.25, label: "3 to 5" },
            { from: 6, to: null, points: 0, label: "6 or more" },
          ],
        },
        {
          id: "C2",
          question: "How many tracking tools are in the Android app?",
          max: 0.5,
          bands: [
            { from: 0, to: 0, points: 0.5, label: "None" },
            { from: 1, to: 3, points: 0.25, label: "1 to 3" },
            { from: 4, to: null, points: 0, label: "4 or more" },
          ],
        },
        {
          id: "C3",
          question: "Can you reject all cookies as easily as you can accept them?",
          max: 0.25,
          options: {
            yes: { points: 0.25, label: "Yes" },
            no: { points: 0, label: "No" },
          },
        },
        {
          id: "C4",
          question: "What is the strongest way you can prove it's you when you log in online?",
          max: 0.5,
          options: {
            strong: { points: 0.5, label: "Approve in the app, a passkey or a card reader" },
            sms: { points: 0.25, label: "A code by text, call or email only" },
            none: { points: 0, label: "Password only" },
          },
        },
      ],
    },
    {
      id: "D",
      title: "What the privacy policy tells you",
      short: "Policy",
      keyName: "what the privacy policy says",
      max: 1.5,
      intro: "These checks look only at whether the policy says something, not at whether we like what it says.",
      checks: [
        {
          id: "D1",
          question: "Does it say how long it keeps your data, in years or months?",
          max: 0.5,
          options: {
            specific: { points: 0.5, label: "Yes, with periods" },
            partial: { points: 0.25, label: "Only for some data" },
            none: { points: 0, label: "No" },
          },
        },
        {
          id: "D2",
          question: "Does it say who it shares your data with, by name or clear type?",
          max: 0.25,
          options: {
            yes: { points: 0.25, label: "Yes" },
            no: { points: 0, label: "No" },
          },
        },
        {
          id: "D3",
          question: "Does it explain decisions made about you automatically, and how to ask a person to look again?",
          max: 0.5,
          options: {
            both: { points: 0.5, label: "Explains both" },
            one: { points: 0.25, label: "Explains one" },
            none: { points: 0, label: "Neither" },
          },
        },
        {
          id: "D4",
          question: "Does it say whether your data is used to build or train AI models?",
          max: 0.25,
          options: {
            yes: { points: 0.25, label: "Yes" },
            no: { points: 0, label: "No" },
          },
        },
      ],
    },
    {
      id: "E",
      title: "Your controls",
      short: "Controls",
      keyName: "your controls",
      max: 1,
      checks: [
        {
          id: "E1",
          question: "Can you switch off marketing yourself, online or in the app?",
          max: 0.5,
          options: {
            online: { points: 0.5, label: "Yes, online or in the app" },
            offline: { points: 0.25, label: "Only by phone, post or email" },
            none: { points: 0, label: "No" },
          },
        },
        {
          id: "E2",
          question: "Can you ask for a copy of your data with an online form or in the app?",
          max: 0.5,
          options: {
            online: { points: 0.5, label: "Yes, form or app" },
            offline: { points: 0.25, label: "Only by email, phone or post" },
            none: { points: 0, label: "Not explained" },
          },
        },
      ],
    },
  ],
};
