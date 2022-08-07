const data = {
    products: [
        {
            name: "Tôi thấy hoa vàng trên cỏ xanh",
            slug: "toi-thay-hoa-vang-tren-co-xanh",
            category: "Tiểu thuyết",
            image: "/images/b1.jpg",
            price: 106000,
            discount: 15,
            countInStock: 100,
            author: "Nguyễn Nhật Ánh",
            publisher: "NXB Trẻ",
            weight: 400,
            numberOfPages: 378,
            size: "13 x 20",
            yearPublish: 2018,
            rating: 4.5,
            numReviews: 10,
            description: "Những câu chuyện nhỏ xảy ra ở một ngôi làng nhỏ: chuyện người, chuyện cóc, chuyện ma, chuyện công chúa và hoàng tử, rồi chuyện đói ăn, cháy nhà, lụt lội, ...Bối cảnh là trường học, nhà trong xóm, bãi tha ma.Dẫn chuyện là cậu bé 15 tuổi tên Thiều.Thiều có chú ruột là chú Đàn, có bạn thân là cô bé Mận.Nhưng nhân vật đáng yêu nhất lại là Tường, em trai Thiều, một cậu bé học không giỏi.Thiều, Tường và những đứa trẻ sống trong cùng một làng, học cùng một trường, có biết bao chuyện chung.Chúng nô đùa, cãi cọ rồi yêu thương nhau, cùng lớn lên theo năm tháng, trải qua bao sự kiện biến cố của cuộc đời.Tác giả vẫn giữ cách kể chuyện bằng chính giọng trong sáng hồn nhiên của trẻ con. 81 chương ngắn là 81 câu chuyện hấp dẫn với nhiều chi tiết thú vị, cảm động, có những tình tiết bất ngờ, từ đó lộ rõ tính cách người.Cuốn sách, vì thế, có sức ám ảnh."
        },
        {
            name: "Cây cam ngọt của tôi",
            slug: "cay-cam-ngot-cua-toi",
            category: "Văn học",
            image: "/images/b2.jpg",
            price: 186000,
            discount: 20,
            countInStock: 100,
            author: "José Mauro de Vasconcelos",
            publisher: "NXB Hội Nhà Văn",
            weight: 280,
            numberOfPages: 244,
            size: "20 x 14.5",
            yearPublish: 2020,
            rating: 4,
            numReviews: 9,
            description: "“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.” - Booklist “Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.” - The National Hãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm.Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé.Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi. Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau.Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu. Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn.Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil."
        },
        {
            name: "Chuyện Mẹ Con - Mẹ Yêu Ai Nhất",
            slug: "chuyen-me-con-me-yeu-ai-nhat",
            category: "Truyện thiếu nhi",
            image: "/images/b3.jpg",
            price: 30000,
            discount: 13,
            countInStock: 60,
            author: "Mai Thị Việt Thắng, KUI Phạm, Phạm Hoài Thương",
            publisher: "Phụ Nữ Việt Nam",
            weight: 100,
            numberOfPages: 16,
            size: "24 x 17",
            yearPublish: 2022,
            rating: 5,
            numReviews: 20,
            description: "Thời gian gần đây, bên cạnh việc giúp trẻ phát triển chỉ số IQ, các bậc phụ huynh còn mong muốn giúp con phát triển chỉ số EQ.Chúng ta hiểu EQ là chỉ số trí tuệ cảm xúc, được dùng để thể hiện khả năng của một cá nhân nhân ra và thấu hiểu cảm xúc của chính mình cũng như của những người xung quanh.Nếu trẻ chỉ chú tâm phát triển chỉ số IQ, đạt được sự thông minh vượt trội trong lĩnh vực Toán học, Tin học… nhưng không biết cách thể hiện cảm xúc và suy nghĩ của mình thì sẽ bị hạn chế trong giao tiếp với xã hội xung quanh. Để góp phần giúp trẻ phát triển hoàn thiện ngay từ tuổi thơ, Nhà xuất bản Phụ nữ Việt Nam hân hạnh giới thiệu tới quý bạn đọc 2 bộ sách Chuyện mẹ con – Cùng bé phát triển EQ và Chuyện cha con – Cùng bé phát triển EQ.Với hình thức kể chuyện bằng thơ, câu chữ ngắn ngọn dễ hiểu song cũng không kém phần màu sắc, tác giả kể những câu chuyện nhỏ trong gia đình thật gần gũi và thân thương.Có thể khi đọc chúng ta cũng thấy được chuyện này thật giống chuyện nhà mình thế.Từ những câu chuyện thủ thỉ thắc mắc trước giờ đi ngủ liệu bạn cá, bạn chim “Tối bạn ngủ ở đâu ?” (Đi ngủ thôi) hay người mẹ phải đi công tác xa nhà không thể bên con khi con mình ốm, em bé vẫn mơ về bàn tay mẹ ấm áp “Tựa cánh võng đung đưa” (Về với con), chuyện người cha đi làm bận rộn vẫn ghé siêu thị mua đồ, nấu ăn cho cả gia đình(Ướm giày)...Hay những lúc tỉ tê tâm sự nhỏ to giữa cha mẹ và con cái như “khóc có phải ‘đặc quyền’ của con gái, con trai khóc có phải là yếu đuối không ?” (Con khóc cũng được ba nhỉ ?), hay nhà có nhiều người như vậy thì “Mẹ yêu ai nhất ?”.Dường như thắc mắc của trẻ là vô tận, lúc nào câu hỏi cũng thường trực xuất hiện nhưng liệu chúng ta có tạo cho trẻ niềm tin để sẻ chia, tâm sự hay không mà thôi. Để rồi, khi trẻ tin tưởng chúng ta, từ lúc nào trẻ thần tượng không phải ngôi sao ca nhạc hay diễn viên nào nổi tiếng.Mong ước giản đơn được trở thành người giống ba như cậu bé cứ đứng trước đôi giày của bố, xỏ chân vào và tưởng tượng “Trở thành ba thì sao” (Ướm giày), hay cô bé yêu mẹ đến nỗi dẫu mẹ đầy mùi mồ hôi vẫn thích, kể cả khi mẹ ốm “Lúc người toàn mùi thuốc, Hay sực nức mùi dầu...” (Mùi của mẹ) cũng không thể khiến các em bé ngừng yêu đấng thân sinh ra mình.Có lẽ vì thế nên dẫu xảy ra chuyện gì, việc đầu tiên là các bạn luôn “Gọi mẹ” như muốn tìm được chỗ dựa an toàn cho mình nhất.Cách trao tặng tình yêu cứ lặng lẽ như vậy ngày tháng trôi qua, nhưng bài học thấm qua thời gian thì theo các em đến cả cuộc đời.Chuyện mẹ con  gồm 5 cuốn ngắn gọn, súc tích nhưng trẻ sẽ học được cách thể hiện cảm xúc rất dễ dàng khi có đối tượng mình tin tưởng và biết lắng nghe.Qua đó, các bậc phụ huynh cũng hiểu tâm lý con trẻ và tìm được cách nối gần hơn mối quan hệ của cha mẹ và con cái, điều mà chúng ta vẫn thường gọi “Sự khác biệt của hai thế hệ”. Nhà xuất bản Phụ nữ Việt Nam hi vọng hai bộ sách sẽ được bạn đọc gần xa đón nhận và trở thành người bạn thân thiết của mỗi gia đình."
        },
        {
            name: "Một Pháp",
            slug: "mot-phap",
            category: "Tôn giáo",
            image: "/images/b4.jpg",
            price: 129000,
            discount: 13,
            countInStock: 10,
            author: "Joseph Goldstein",
            publisher: "Hà Nội",
            weight: 300,
            numberOfPages: 288,
            size: "25 x 15",
            yearPublish: 2022,
            rating: 3,
            numReviews: 5,
            description: "Ngày nay, chúng ta đang đi tới một vòng tròn trọn vẹn và lần nữa lại có một sự giao thoa lớn giữa các truyền thống. Những yếu tố nuôi dưỡng sự nổi lên của Một Pháp vào thời điểm này là sự phong phú to lớn của những giáo lý đã sẵn có và sự khó khăn của việc đánh giá những quan niệm khác biệt, mỗi quan niệm đều đúng và được chứng nghiệm từ góc nhìn của chính nó. Khi học hỏi và tôn trọng những vị thầy và giáo lý từ nhiều truyền thống khác nhau, thách thức của chúng ta là làm sao để nắm giữ tất cả trong sự sáng suốt thay vì trong sự hoang mang hoặc mâu thuẫn. Phật giáo phương Tây chắc chắn sẽ là một sự tổng hợp của những truyền thống trí tuệ vĩ đại này. Điều đó đã và đang diễn ra. Đây không cần phải là một sự mai một hoặc trộn lẫn của những giáo lý khác nhau. Chúng ta có thể thực hành mỗi giáo lý trong sự trọn vẹn của riêng chúng và đạt tới một chiều sâu thực sự của hiểu biết. Năm 1985, tôi tham gia một khóa thiền ở Nepal với Sayadaw U Pandita.Chúng tôi sống trong những khu tập thể đông đúc và thực hành trong những hoàn cảnh mà tôi cho là kém lý tưởng.Năm người chúng tôi sống chung trong một căn phòng có nền bê tông ngay cạnh nhà tiêu.Khi thiền hành, tâm tôi cứ bị phân tán với đủ loại phán xét về người khác và sau đó tràn đầy nghi ngờ về bản thân, tất cả đều có vẻ hoàn toàn chính đáng.Khi tôi trình kinh nghiệm của mình với Sayadaw, Ngài khuyên: “Hãy chú tâm hơn nữa.” Lúc đầu tôi nghĩ: “Chà, một sự trợ giúp lớn đây!” nhưng sau đó quyết định thử làm theo lời khuyên của Ngài.Tôi bắt đầu chú tâm nhiều hơn đến những chuyển động khi đi bộ, đến những cảm giác mà mình đang cảm nhận.Thật kinh ngạc, tâm lập tức yên lặng trở lại; trong sự khít khao của sự tập trung vào cơ thể, không có nhiều chỗ cho tất cả những đánh giá, nghi ngờ. Học cách sống trong một không gian thân thiện và yêu thương đòi hỏi sự kiên nhẫn và liên tục.Chúng ta rất thường xuyên rơi vào những khuôn mẫu quen thuộc của sự khó chịu, bực bội, tức giận và ác ý.Nhưng những trạng thái này cũng có thể là một hồi chuông cảnh tỉnh nhắc nhở chúng ta nên khảo sát hơn là chết chìm trong chúng.Thomas Merton biết rằng trải qua những giai đoạn khó khăn là một phần thiết yếu của hành trình tâm linh.Ông viết:“Cầu nguyện và yêu thương được học trong thời điểm mà cầu nguyện trở nên bất khả thi và trái tim hóa đá.”"
        }
    ]
}

export default data;