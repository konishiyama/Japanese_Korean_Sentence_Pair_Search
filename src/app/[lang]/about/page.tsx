import Link from 'next/link';

export default function About() {
  return (
    <main>
      <div className="justify-center items-center mx-auto text-base sm:w-4/5">
        <h1 className='text-center font-thin text-4xl my-10 sm:my-16'>About</h1>
        <div className='text-light'>
          <p className='mb-6 sm:mb-8'>日本語・韓国語の学習者が、実際の用法を確かめたいときに利用できる例文検索サイトです。</p>
          <p className='mb-6 sm:mb-8'>日本語・韓国語の対訳文章80万ペア（2023年11月時点）を収録しています。用例を確かめたいキーワードを検索欄に入力し、簡単に例文を検索することができます。</p>
          <p className='mb-6 sm:mb-8'>作成者自身も日韓バイリンガルのエンジニアです。私自身、日頃から言語を学習する上で、一般的な検索では対訳を探すことは用意ではないのと、業界最大手（と思われる）ネイバー辞書の機能が使いづらいと思っていたことがきっかけで作成しました。</p>
          <p className='mb-6 sm:mb-8'>まだまだ改善点はたくさんあると思いますが、ご意見やご要望はいつでも大歓迎です。下記の連絡先までお気軽にご連絡ください。例文検索に限らず、言語学習のためにこんなものがほしい、というような声もありがたいです。</p>
        </div>
        <div className='text-light text-center mt-10 mb-10 sm:mt-16 sm:mb-16'>
          <a 
            href="mailto:ko.nishiyama.0420@gmail.com"
            className="font-semibold hover:text-indigo-shade"> ko.nishiyama.0420@gmail.com
            </a>
        </div>
      </div>
    </main>
  )
}
