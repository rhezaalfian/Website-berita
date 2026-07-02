// Data berita untuk website. Dalam aplikasi nyata, data ini akan diambil dari API/CMS.
const NEWS_DATA = [
  {
    id: 1,
    title: "Pemerintah Luncurkan Program Digitalisasi UMKM di 34 Provinsi",
    category: "Ekonomi",
    author: "Rizky Pratama",
    date: "2026-07-02",
    image: "https://picsum.photos/seed/ekonomi1/800/500",
    excerpt: "Program ini menargetkan lebih dari 5 juta pelaku UMKM untuk go digital dalam dua tahun ke depan dengan dukungan pelatihan dan akses permodalan.",
    featured: true,
    content: [
      "Pemerintah resmi meluncurkan program digitalisasi Usaha Mikro, Kecil, dan Menengah (UMKM) yang akan menjangkau seluruh 34 provinsi di Indonesia. Program ini merupakan bagian dari upaya percepatan transformasi ekonomi digital nasional.",
      "Dalam peluncuran yang berlangsung di Jakarta, disebutkan bahwa target program adalah membantu lebih dari 5 juta pelaku UMKM untuk beralih ke platform digital dalam kurun waktu dua tahun. Dukungan yang diberikan mencakup pelatihan pemasaran digital, pendampingan teknis, hingga akses permodalan.",
      "\"Kami ingin memastikan bahwa tidak ada pelaku usaha yang tertinggal dalam era ekonomi digital. Digitalisasi bukan lagi pilihan, melainkan kebutuhan,\" ujar salah satu pejabat terkait dalam sambutannya.",
      "Program ini juga menggandeng sejumlah platform e-commerce dan perusahaan teknologi finansial untuk memperluas jangkauan dan mempermudah proses onboarding para pelaku usaha."
    ]
  },
  {
    id: 2,
    title: "Timnas Sepak Bola Raih Kemenangan Dramatis di Menit Akhir",
    category: "Olahraga",
    author: "Andi Saputra",
    date: "2026-07-01",
    image: "https://picsum.photos/seed/olahraga1/800/500",
    excerpt: "Gol di menit ke-90 memastikan tim nasional lolos ke babak selanjutnya setelah pertandingan yang menegangkan.",
    featured: true,
    content: [
      "Tim nasional sepak bola meraih kemenangan dramatis pada pertandingan tadi malam melalui gol yang tercipta di menit ke-90. Kemenangan ini memastikan langkah tim ke babak selanjutnya.",
      "Pertandingan berlangsung sengit sejak menit awal. Kedua tim saling menyerang dan menciptakan sejumlah peluang emas. Namun kebuntuan baru terpecah di penghujung laga.",
      "Pelatih mengapresiasi semangat juang para pemain yang tidak menyerah hingga peluit akhir. \"Ini adalah kemenangan kerja keras dan mental yang kuat,\" katanya dalam konferensi pers.",
      "Para suporter menyambut kemenangan ini dengan penuh sukacita. Ribuan penonton yang memadati stadion bersorak merayakan hasil positif tersebut."
    ]
  },
  {
    id: 3,
    title: "Startup Lokal Kembangkan AI untuk Deteksi Dini Penyakit",
    category: "Teknologi",
    author: "Dewi Lestari",
    date: "2026-07-01",
    image: "https://picsum.photos/seed/teknologi1/800/500",
    excerpt: "Teknologi kecerdasan buatan ini diklaim mampu mendeteksi tanda-tanda awal penyakit dengan tingkat akurasi tinggi.",
    featured: true,
    content: [
      "Sebuah startup teknologi kesehatan asal Indonesia berhasil mengembangkan sistem kecerdasan buatan (AI) yang mampu mendeteksi dini berbagai penyakit berdasarkan analisis data medis pasien.",
      "Sistem ini dikembangkan selama tiga tahun dengan melibatkan tim dokter, peneliti, dan insinyur perangkat lunak. Hasil uji coba menunjukkan tingkat akurasi yang menjanjikan.",
      "\"Deteksi dini adalah kunci keberhasilan pengobatan. Dengan teknologi ini, kami berharap dapat membantu tenaga medis mengambil keputusan lebih cepat dan tepat,\" ujar pendiri startup tersebut.",
      "Ke depan, perusahaan berencana bekerja sama dengan rumah sakit dan puskesmas untuk memperluas implementasi teknologi ini di berbagai daerah."
    ]
  },
  {
    id: 4,
    title: "Festival Budaya Nusantara Sedot Ratusan Ribu Pengunjung",
    category: "Hiburan",
    author: "Siti Nurhaliza",
    date: "2026-06-30",
    image: "https://picsum.photos/seed/hiburan1/800/500",
    excerpt: "Beragam pertunjukan seni tradisional dari berbagai daerah ditampilkan dalam festival tahunan yang meriah.",
    featured: false,
    content: [
      "Festival Budaya Nusantara yang digelar selama seminggu berhasil menyedot ratusan ribu pengunjung dari dalam dan luar negeri. Acara ini menampilkan kekayaan budaya dari berbagai daerah di Indonesia.",
      "Beragam pertunjukan seni tradisional seperti tari, musik, dan teater ditampilkan di panggung utama. Selain itu, terdapat pula bazar kuliner dan kerajinan tangan khas daerah.",
      "Festival ini menjadi ajang promosi pariwisata sekaligus pelestarian budaya. Banyak pengunjung yang mengaku terkesan dengan keberagaman budaya yang ditampilkan."
    ]
  },
  {
    id: 5,
    title: "Riset Terbaru: Pola Tidur Berpengaruh pada Produktivitas Kerja",
    category: "Kesehatan",
    author: "Dr. Budi Santoso",
    date: "2026-06-30",
    image: "https://picsum.photos/seed/kesehatan1/800/500",
    excerpt: "Studi menunjukkan bahwa kualitas tidur yang baik dapat meningkatkan produktivitas hingga 30 persen.",
    featured: false,
    content: [
      "Sebuah riset terbaru mengungkapkan hubungan erat antara pola tidur dengan tingkat produktivitas kerja seseorang. Kualitas tidur yang baik terbukti mampu meningkatkan produktivitas secara signifikan.",
      "Penelitian yang melibatkan ribuan responden ini menemukan bahwa mereka yang tidur cukup dan berkualitas memiliki tingkat konsentrasi dan kreativitas yang lebih tinggi.",
      "Para ahli merekomendasikan waktu tidur 7-8 jam per malam serta menjaga rutinitas tidur yang konsisten untuk mendapatkan manfaat optimal."
    ]
  },
  {
    id: 6,
    title: "Harga Komoditas Global Alami Fluktuasi Signifikan",
    category: "Ekonomi",
    author: "Rizky Pratama",
    date: "2026-06-29",
    image: "https://picsum.photos/seed/ekonomi2/800/500",
    excerpt: "Ketidakpastian ekonomi global memicu pergerakan harga sejumlah komoditas utama di pasar internasional.",
    featured: false,
    content: [
      "Harga sejumlah komoditas utama di pasar global mengalami fluktuasi yang cukup signifikan dalam beberapa pekan terakhir. Kondisi ini dipicu oleh berbagai faktor ketidakpastian ekonomi global.",
      "Para analis memperkirakan volatilitas harga masih akan berlanjut dalam jangka pendek. Pelaku pasar diimbau untuk mencermati perkembangan situasi secara berkala.",
      "Pemerintah menyatakan akan terus memantau dampak fluktuasi ini terhadap perekonomian domestik dan menyiapkan langkah antisipasi yang diperlukan."
    ]
  },
  {
    id: 7,
    title: "Klub Basket Nasional Datangkan Pemain Bintang dari Luar Negeri",
    category: "Olahraga",
    author: "Andi Saputra",
    date: "2026-06-28",
    image: "https://picsum.photos/seed/olahraga2/800/500",
    excerpt: "Kedatangan pemain berpengalaman ini diharapkan meningkatkan performa tim di kompetisi musim mendatang.",
    featured: false,
    content: [
      "Salah satu klub basket ternama di tanah air resmi mendatangkan pemain bintang dari luar negeri untuk memperkuat skuad menghadapi kompetisi musim mendatang.",
      "Pemain berpengalaman ini memiliki rekam jejak yang mengesankan di berbagai liga internasional. Kehadirannya diharapkan mampu mengangkat performa dan mental tim.",
      "Manajemen klub optimistis dengan komposisi tim yang semakin solid ini mereka dapat bersaing memperebutkan gelar juara."
    ]
  },
  {
    id: 8,
    title: "Perangkat Wearable Generasi Baru Hadir dengan Fitur Kesehatan Canggih",
    category: "Teknologi",
    author: "Dewi Lestari",
    date: "2026-06-27",
    image: "https://picsum.photos/seed/teknologi2/800/500",
    excerpt: "Gawai pintar terbaru ini dilengkapi sensor pemantau kesehatan yang lebih akurat dan baterai tahan lama.",
    featured: false,
    content: [
      "Sebuah perangkat wearable generasi terbaru resmi diperkenalkan ke publik dengan sederet fitur pemantau kesehatan yang lebih canggih dibanding pendahulunya.",
      "Perangkat ini dibekali sensor yang mampu memantau detak jantung, kadar oksigen, kualitas tidur, hingga tingkat stres dengan akurasi tinggi. Daya tahan baterainya pun diklaim lebih lama.",
      "Produk ini menyasar konsumen yang semakin peduli terhadap kesehatan dan gaya hidup aktif. Peminatnya diprediksi terus meningkat seiring tren hidup sehat."
    ]
  },
  {
    id: 9,
    title: "Film Karya Sineas Muda Raih Penghargaan di Festival Internasional",
    category: "Hiburan",
    author: "Siti Nurhaliza",
    date: "2026-06-26",
    image: "https://picsum.photos/seed/hiburan2/800/500",
    excerpt: "Karya sinema anak bangsa kembali mengharumkan nama Indonesia di kancah perfilman dunia.",
    featured: false,
    content: [
      "Sebuah film karya sineas muda Indonesia berhasil meraih penghargaan bergengsi di sebuah festival film internasional. Prestasi ini menambah daftar panjang kiprah sinema Indonesia di kancah dunia.",
      "Film tersebut mengangkat cerita yang dekat dengan kehidupan masyarakat dengan pendekatan sinematografi yang memukau. Juri memuji orisinalitas dan kedalaman narasinya.",
      "Sang sutradara menyampaikan rasa syukur dan berharap prestasi ini dapat memotivasi para pembuat film muda lainnya untuk terus berkarya."
    ]
  },
  {
    id: 10,
    title: "Kampanye Hidup Sehat Digencarkan untuk Cegah Penyakit Tidak Menular",
    category: "Kesehatan",
    author: "Dr. Budi Santoso",
    date: "2026-06-25",
    image: "https://picsum.photos/seed/kesehatan2/800/500",
    excerpt: "Masyarakat diajak menerapkan pola makan seimbang dan aktivitas fisik rutin untuk hidup lebih sehat.",
    featured: false,
    content: [
      "Kampanye hidup sehat kembali digencarkan sebagai upaya mencegah meningkatnya kasus penyakit tidak menular seperti diabetes, hipertensi, dan penyakit jantung.",
      "Masyarakat diajak untuk menerapkan pola makan seimbang, rutin berolahraga, serta menghindari kebiasaan buruk seperti merokok dan konsumsi gula berlebih.",
      "Kampanye ini melibatkan berbagai pihak mulai dari tenaga kesehatan, komunitas, hingga institusi pendidikan untuk menjangkau masyarakat seluas mungkin."
    ]
  },
  {
    id: 11,
    title: "Investasi Sektor Energi Terbarukan Tumbuh Pesat Tahun Ini",
    category: "Ekonomi",
    author: "Rizky Pratama",
    date: "2026-06-24",
    image: "https://picsum.photos/seed/ekonomi3/800/500",
    excerpt: "Minat investor terhadap proyek energi hijau meningkat seiring komitmen menuju transisi energi berkelanjutan.",
    featured: false,
    content: [
      "Investasi di sektor energi terbarukan mencatatkan pertumbuhan yang pesat sepanjang tahun ini. Tren positif ini didorong oleh komitmen global menuju transisi energi berkelanjutan.",
      "Sejumlah proyek pembangkit listrik tenaga surya, angin, dan air menarik minat investor dari dalam maupun luar negeri. Pemerintah pun memberikan berbagai insentif untuk mendorong investasi.",
      "Para pengamat menilai sektor energi terbarukan memiliki prospek cerah dan akan menjadi salah satu motor penggerak ekonomi di masa depan."
    ]
  },
  {
    id: 12,
    title: "Konser Musik Amal Kumpulkan Dana untuk Korban Bencana",
    category: "Hiburan",
    author: "Siti Nurhaliza",
    date: "2026-06-23",
    image: "https://picsum.photos/seed/hiburan3/800/500",
    excerpt: "Sejumlah musisi ternama tampil dalam konser amal yang berhasil menggalang dana bantuan kemanusiaan.",
    featured: false,
    content: [
      "Sebuah konser musik amal digelar dengan menghadirkan sejumlah musisi ternama tanah air. Acara ini bertujuan menggalang dana bantuan bagi para korban bencana alam.",
      "Antusiasme masyarakat sangat tinggi. Tiket konser terjual habis dan seluruh hasil penjualan disalurkan untuk membantu para korban yang membutuhkan.",
      "Para musisi menyatakan kebanggaan dapat berkontribusi melalui musik. \"Ini adalah bentuk solidaritas kami untuk saudara-saudara yang sedang kesulitan,\" ujar salah satu penampil."
    ]
  }
];

const CATEGORIES = ["Ekonomi", "Olahraga", "Teknologi", "Hiburan", "Kesehatan"];

// Ekspor agar dapat digunakan tanpa module bundler
if (typeof window !== "undefined") {
  window.NEWS_DATA = NEWS_DATA;
  window.CATEGORIES = CATEGORIES;
}
