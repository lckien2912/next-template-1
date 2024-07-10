# Ecomdex

## Công nghệ sử dụng

---

- Nexjs 14
- UI: ShadcnUI (Radix), Tanstack Table
- API: axios, Tanstack Query v5
- Form: React Hook Form, zod
- Kết nối ví: Wagmi
- Style: TailwindCSS, Module CSS

## Coding Convention

---

[Coding style](https://www.notion.so/Coding-style-47e9b0f6d4cf478a8c7f968cf0f85889?pvs=21) 

[Cấu trúc folder](https://www.notion.so/C-u-tr-c-folder-1194fd67edba47d18c5fb01ce93f19af?pvs=21) 

[Naming Convention](https://www.notion.so/Naming-Convention-7d995f7816694e13a0323d26aef1844d?pvs=21) 

[Component](https://www.notion.so/Component-caf59ff6c19c4c0682aab20d81ab7785?pvs=21) 

[Typescript](https://www.notion.so/Typescript-e898a8d241934859852cf8b2003bdb85?pvs=21) 

[Git](https://www.notion.so/Git-dc5327d0a18c45acb9dbc163b75e2347?pvs=21) 

[Style](https://www.notion.so/Style-98da2bcf0d8f42a29d494ef93f073fe3?pvs=21) 

[Import](https://www.notion.so/Import-294ab1f0dfa44d03881468c8351dea36?pvs=21) 

### Coding style

---

- Hạn chế tối đa việc sử dụng let và không sử dụng var.
- Ưu tiên dùng các array methods `map`/`filter`/`reduce`/`some`/`every` thay vì `for`.
- **DRY - Don't Repeat Yourself**. Nên sử dụng constants cho các biến hoặc tên riêng và utils cho functions được sử dụng ở nhiều chỗ.
- Khi lấy data từ object hay array thì nên destructuring. Có thể tham khảo ở link dưới:

[Destructuring Javascript là gì? Buông gì buông chứ đừng bỏ qua phần này của ES6.](https://anonystick.com/blog-developer/destructuring-javascript-la-gi-buong-gi-buong-chu-dung-bo-qua-phan-nay-cua-es6-2019122141422037)

- Khoảng cách giữa các dòng code
    - Sau khi import, cách ra 1 dòng.
    - Khoảng cách giữa các biến bình thường không cần cách dòng.
    - Khoảng cách giữa các function cách 1 dòng.
    - Cách return 1 dòng
    
    ```jsx
    // Bad
    import abc from "bcd"
    export const ProductList = () => {
    	const [data, setData] = useState<IResponseProductData[]>([])
    	const [filter, setFilter] = useState<IParamsProductData>({
    		page: 1,
    		limit: 6
    	})
    	useEffect(() => {
    		const getData = async () => {
    			const res = await getProductData(filter)
    			// ...
    		}
    		getData()
    	}, [filter])
    	return
    	// ...
    }
    
    // Good
    import abc from "bcd"
    
    export const ProductList = () => {
    	const [data, setData] = useState<IResponseProductData[]>([])
    	const [filter, setFilter] = useState<IParamsProductData>({
    		page: 1,
    		limit: 6
    	})
    	
    	useEffect(() => {
    		const getData = async () => {
    			const res = await getProductData(filter)
    			// ...
    		}
    
    		getData()
    	}, [filter])
    
    	return 
    	// ...
    }
    ```
    

### Cấu trúc folder

---

```jsx
 	|--src
    |-- app                       // Container components. Only contain route. Ex: page and layout  
	  |-- assets 
	    |-- fonts
	    |-- images
			|-- icons
    |-- components                // Dumb components. Ex: Button, Text, Flex, Grid,... etc
			|-- ProductList
				|-- index.tsx             // Contain Product Items
				|-- ProductItem.tsx
				|-- data.ts               // Contain mock data
			|-- ui                      // Base components that user can interact with. 
    |-- constants                 // Contain constant values.
    |-- hooks                     // Custom hooks
    |-- services                  // Handle data fetching
    |-- lib
			|-- utils.ts                     // Reusable functions
		|-- types                     // Contain common types
			|-- models                   // Contain types of response data and param types for each API
```

### Naming Convention

---

- Đặt tên các route: kebab-case.
- Đặt tên component: PascalCase. Đặt tên các component đúng nghĩa theo các trường hợp sử dụng.
- Đặt tên các function: camelCase.
- Với các biến boolean thì cần đặt tên có *is* ở đầu. Ví dụ: isLoading, isOpen,…
- Với các function call API. Ví dụ với endpoint /api/product-list:
    - **GET**: getProductList
    - **POST**: createProductList
    - **PATCH**/**PUT**: updateProductList
    - **DELETE**: deleteProductList
- Đặt tên component **PHẢI TRÙNG** với tên file hoặc tên folder chứa component đấy.
- Khi import component, tên được import phải trùng với tên component.

### Component

---

- Chia các component càng nhỏ càng tốt, phần render không nên dài quá 50 dòng.
- Nếu 1 đoạn code **lặp lại trên 2 lần** thì cần tạo thành 1 component riêng.
- Các component nên là 1 module vừa có khả năng tái sử dụng, vừa có khả năng mở rộng mà vẫn hoạt động đúng tất cả các chức năng của nó mà các logic không quá phức tạp.
- Mỗi file chỉ chứa 1 component duy nhất.
- Các thông tin không liên quan đến component như mock data thì nên tạo 1 file data cùng cấp với file component sau đó import sang.
    
    ```jsx
    |-- ProductList
    	|-- index.tsx             // Contain Product Items
    	|-- ProductItem.tsx
    	|-- data.ts               // Contain mock data
    ```
    
- Khi sử dụng một component nào, cần đọc xem cách sử dụng component như nào để tránh sử dụng sai cách.
- Khi chỉnh sửa một component có sẵn nào đấy, cần đảm bảo các chức năng của nó ở các vị trí khác vẫn hoạt động đúng.

### Typescript

---

- Viết interface cho component
    
    ```jsx
    // bad
    function Bookend({ side = "right", children }: {side: string, children: React.ReactNode}) {
      // ...
    }
    
    // good
    interface IBookendProps extends typeof defaultProps { 
    	side = "right", 
    	children 
    };
    
    const defaultProps = {
      age: 21,
    };
    
    const Bookend: FC<BookendProps> = ({ side, children }) => {
      // etc
    };
    Bookend.defaultProps = defaultProps;
    ```
    
- Viết interface cho API
    
    Interface của API trả về và interface của state khi set giá trị data cần phải trùng nhau.
    
    ```jsx
    // models/product.ts
    export interface IParamsProductData = {
    	page: number;
    	limit: number;
    }
    
    export interface IResponseProductData = {
    	id: number;
    	title: string;
    	price: number;
    }
    
    // services/product.ts
    import { IParamsProductData , IResponseProductData } from "@/models/product"
    
    export const getProductData = async (params: IParamsProductData) => {
    	return api.get<IResponseProductData[]>("/get-product", params);
    }
    
    // components/ProductList/index.tsx
    import { IParamsProductData, IResponseProductData } from "@/models/product"
    import { getProductData } from "@/services/product"
    
    export const ProductList = () => {
    	const [data, setData] = useState<IResponseProductData[]>([])
    	const [filter, setFilter] = useState<IParamsProductData>({
    		page: 1,
    		limit: 6
    	})
    	
    	useEffect(() => {
    		const getData = async () => {
    			const res = await getProductData(filter)
    			// ...
    		}
    
    		getData()
    	}, [filter])
    
    	return 
    	// ...
    }
    
    ```
    
- Nếu có 1 type nào đấy lặp lại nhiều lần, nên viết thành 1 common type sau đó import để tái sử dụng.
- Tránh việc sử dụng *any*. Nếu có data nào không rõ thì có thể để *unknown.*

### Git

---

- Đặt tên nhánh **rõ ràng**, và **đúng nghĩa** với task đang làm.
- Mỗi nhánh sẽ chỉ tương ứng với **duy nhất** 1 task, không làm các task không liên quan trong nhánh đấy.
- Quy tắc đặt tên nhánh: *[prefix]/[số_task]_[tên_task]*
- Prefix khi đặt tên nhánh:
    - **feature -** Tạo tính năng mới
    - **fix -** Sửa lỗi
    - **update -** Cập nhật tính năng
- Khi viết commit, cần viết rõ commit đấy đã chỉnh sửa gì trong code theo syntax: **
    
    > *[prefix] [page] [tính năng đã sửa]*
    > 
- Tránh đặt tên commit chỉ có mỗi 1 2 chữ như: save hay fix như hình dưới.

![Untitled](Ecomdex%20b1ecabb07c554fb38af44eb0e3c700eb/Untitled.png)

### Style

---

- Sử dụng TailwindCSS để style.
- Nếu style phức tạp thì tạo file *style.module.css* để viết class nhằm tránh file *global.css* phức tạp và khó bảo trì.
- Khi nối các className hay xử lý custom style, phải sử dụng hàm ***cn()*** từ utils.

```jsx
// bad 
import styles from "./style.module.css"

const Component = ({ className, textColor }) => (
	<div className=`flex gap-4 w-full bg-primary ${textColor ? textColor : "text-white"} ${styles.customClassName} ${className}`>
		ABCDEFGH
	</div>
);

// good
import { cn } from "@/utils"
import styles from "./style.module.css"

const Component = ({ className, textColor }) => (
	<div className={cn(
		"flex gap-4 w-full bg-primary", 
		textColor ? textColor : "text-white",
		styles.customClassName,
		className
	)}>
		ABCDEFGH
	</div>
);
```

### Import

---

- Nên import theo thứ tự: external/library → internal files.