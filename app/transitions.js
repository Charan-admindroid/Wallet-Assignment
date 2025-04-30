/* eslint-disable prettier/prettier */
export default function () {
    this.transition(
      this.fromRoute('index'),
      this.toRoute('subs-add'),
      this.use('crossFade'),
      this.reverse('crossFade'),
    );
    this.transition(
      this.fromRoute('index'),
      this.toRoute('subs-edit'),
      this.use('crossFade'),
      this.reverse('crossFade'),
    );

    this.transition(
        this.fromRoute('index'),
        this.toRoute('wallet-money'),
        this.use('crossFade'),
        this.reverse('crossFade')
    )
    this.transition(
      this.fromRoute('index'),
      this.toRoute('transactions'),
      this.use('crossFade'),
      this.reverse('crossFade')
    ),

    this.transition(
      this.fromRoute('index'),
      this.toRoute('send'),
      this.use('crossFade'),
      this.reverse('crossFade')
    )
  }