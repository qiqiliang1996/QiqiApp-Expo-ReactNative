import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';

export default function AggrementScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.screen}>
        <Text style={styles.agg_header}>
          1. Confirmation and acceptance of the terms of the agreement
        </Text>
        <Text style={styles.agg_body}>
          1.1 QiqiApp operates and enjoys full ownership and intellectual
          property rights. The services provided by QiqiApp will be strictly
          implemented in accordance with its published terms and operating
          rules. 1.2 You confirm that you agree to the various rules and
          reminders that QiqiApp has announced or will announce in the future.
          All the agreements, rules and reminders are an inseparable whole, have
          the same legal effect, and together constitute the overall agreement
          for users to use QiqiApp software and related services. hereinafter
          collectively referred to as "this agreement") and complete the
          registration process, this agreement will be established and legally
          effective between you and the company, and you will become an official
          user of QiqiApp.
        </Text>
        <Text style={styles.agg_header}>
          2. Account registration and usage rules
        </Text>
        <Text style={styles.agg_body2}>
          2.1 After you successfully register, QiqiApp will give you a user
          account and corresponding password, and you are responsible for
          keeping the user account and password; you should be legally
          responsible for all activities and events with your user account. 2.2
          You promise not to use QiqiApp in any way to directly or indirectly
          engage in acts that violate the law and social morality, and QiqiApp
          has the right to delete the content that violates the above
          commitments. 2.3 You shall not use QiqiApp to produce, upload, copy,
          publish, disseminate or reprint the following content: You are not
          allowed to use this website to produce, upload, copy, publish,
          disseminate or reprint the following content: (1) Damage to national
          honor and interests; (2) Spread rumors, disrupt social order, and
          destroy social stability; (3) Spread obscene , pornography, gambling,
          violence, murder, terror or instigation to commit crimes; (4)
          Insulting or slandering others, infringing on the lawful rights and
          interests of others; (5) Infringing upon the lawful rights and
          interests of minors or damaging the physical and mental health of
          minors; (6) Information containing other content prohibited by laws
          and administrative regulations. QiqiApp encourages users to make full
          use of the QiqiApp platform to freely publish and share their own
          information, and users enjoy copyright in accordance with the law for
          the legal content (including but not limited to text, pictures, video,
          audio, etc.) created and published on QiqiApp. You should not publish
          other people's content protected by intellectual property laws, etc.
          through QiqiApp, unless legally authorized by others. Regarding the
          content you posted, if a third party complains to QiqiApp and submits
          preliminary evidence, and QiqiApp judges that the complaint is true,
          QiqiApp will delete the content. If you cause losses to QiqiApp due to
          the content you publish, you shall be responsible for compensation.
          2.4 With the permission of the company, the sharing and forwarding of
          QiqiApp's information content by you and third parties should also
          comply with the following specifications: Search volume, click-through
          rate, reading volume and other related data, without the company's
          prior written consent, the above data shall not be published, provided
          or leaked to any third party in any way; Any changes, including but
          not limited to QiqiApp's homepage link, advertising system link and
          other entrances, shall not block, insert, pop-up windows, etc. in any
          form to the display of QiqiApp's source page; (3) It shall be safe,
          effective, and strict measures to prevent the information content of
          QiqiApp from being illegally obtained by third parties in any form,
          including but not limited to "spider" programs; (4) The relevant data
          content shall not be used for purposes beyond the scope of the
          company's written permission. Any form of sale and commercial use, or
          disclosure to third parties, offering or permitting third parties to
          use in any way. (5) Your behavior of sharing, forwarding, and copying
          the content of QiqiApp information to any third party should also
          abide by other norms and standards formulated by the company for this
          purpose, such as the "QiqiApp Community Standards" and other rules
          that have been announced or will be announced in the future. and
          hints, etc. 2.5 QiqiApp has the right to review and supervise your use
          of QiqiApp. If you violate any of the above provisions when using
          QiqiApp, QiqiApp or its authorized persons have the right to require
          you to correct or directly take all necessary measures (including but
          not limited to changes or delete your content, suspend or terminate
          your right to use QiqiApp) to mitigate the impact of your misconduct.
          2.6 If you need to terminate the use of QiqiApp services, you can
          apply to cancel your account. After successful cancellation, account
          records, functions, etc. will not be restored or provided, but you
          should still be responsible for your actions before canceling your
          account and during the use of QiqiApp services.
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    // paddingBottom: 200,
    // backgroundColor: colors.light,
  },
  agg_header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  agg_body: {
    lineHeight: 25,
    // paddingBottom: 40,
  },
  agg_body2: {
    lineHeight: 25,
    paddingBottom: 60,
  },
});
