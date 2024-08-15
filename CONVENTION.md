## Công nghệ sử dụng

---

- Framework: [Next.js 14](https://nextjs.org/docs)
- UI: [ShadcnUI (Radix)](https://ui.shadcn.com/docs), [Tanstack Table v8](https://tanstack.com/table/latest/docs/introduction)
- State Management: [Tanstack Query v5](https://tanstack.com/query/latest/docs/framework/react/overview)
- Fetch data: [Native Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- Form: [React Hook Form](https://react-hook-form.com/), [zod](https://zod.dev/)
- Blockchain: [Wagmi](https://wagmi.sh/react/getting-started)
- Style: [Tailwind CSS](https://tailwindcss.com/docs/installation), [CSS Modules](https://viblo.asia/p/css-modules-voi-create-react-app-1VgZvG9YlAw)

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
- Nếu các biến không đổi hoặc các function tính toán/xử lý data được sử dụng ở nhiều vị trí khác nhau trong dự án thì nên định nghĩa cho các biến đó trong folder constants hoặc trong folder utils nếu là function.
- Khi lấy data từ object hay array thì nên destructuring. Có thể tham khảo ở link dưới:

[Destructuring Javascript là gì? Buông gì buông chứ đừng bỏ qua phần này của ES6.](https://anonystick.com/blog-developer/destructuring-javascript-la-gi-buong-gi-buong-chu-dung-bo-qua-phan-nay-cua-es6-2019122141422037)

- Khoảng cách giữa các dòng code
  - Sau khi import hoặc export, cách ra 1 dòng.
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
	|-- public                      // Static assets to be served
 		|-- fonts
	 	|-- icons
	 	|-- images
 	|--src
    |-- app                       // Container components. Only contain route. Ex: page and layout
    |-- components                // Dumb components. Ex: Button, Text, Flex, Grid,... etc
			|-- ProductList
				|-- index.tsx             // Contain Product Items
				|-- ProductItem.tsx
				|-- data.ts               // Contain mock data
			|-- ui                      // UI components that the user can interact with.
    |-- constants                 // Contain constant values.
    |-- hooks                     // Custom hooks
    |-- services                  // Handle data fetching
	    |-- user
		    |-- user.service.ts       // Contain function to call API in route /user
		    |-- user.model.ts         // Contain data type response from server
		    |-- user.type.ts          // Contain params
		    |-- user.action.ts        //
    |-- lib
			|-- utils.ts                // Reusable functions
		|-- types                     // Contain common types
			|-- models                  // Contain types of response data and param types for each API
```

- Component Folder Structure: Tree. Đọc kĩ hơn trong bài viết bên dưới.
  [A Better Frontend Component Structure: Component Trees](https://betterprogramming.pub/a-better-frontend-component-structure-component-trees-5a99ed6d1ece)

### Naming Convention

---

- Đặt tên các route: kebab-case.
- Đặt tên component: PascalCase. Đặt tên component rõ ràng đúng nghĩa theo chức năng hoạt động của component đó.
- Đặt tên component **PHẢI TRÙNG** với tên file hoặc tên folder chứa component đấy.
- Khi import component, tên được import phải trùng với tên component.
- Đặt tên các function: camelCase.
- Với các biến boolean thì cần đặt tên có prefix _is, has, should, can, did, will_. Ví dụ: isLoading, isOpen, hasToDoSomthing,…
- Với các function call API. Ví dụ với endpoint _/api/product-list_:
  - **GET**: getProductList
  - **POST**: createProductList
  - **PATCH**/**PUT**: updateProductList
  - **DELETE**: deleteProductList

### Component

---

- Chia các component càng nhỏ càng tốt, phần render HTML của mỗi component không nên dài quá 50 dòng.
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
  - Khi viết props type của component, tách ra thành một interface có suffix Props.
  ```jsx
  // bad
  function Bookend({ side = "right", children }: {side: string, children: React.ReactNode}) {
    // ...
  }

  // good
  interface BookendProps extends typeof defaultProps {
  	side = "right",
  	children: React.ReactNode,
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
  - Interface của API trả về và interface của state khi set giá trị data cần phải trùng nhau.
    ```jsx
    // services/product/product.type.ts
    export interface ProductDataParams = {
    	page: number;
    	limit: number;
    }

    // services/product/product.model.ts
    export interface ProductDataModel = {
    	id: number;
    	title: string;
    	price: number;
    }

    // services/product.service.ts
    import { ProductDataParams } from "./product.type.ts"
    import { ProductDataModel } from "./product.model.ts"

    export const getProductData = async (params: ProductDataParams ) => {
    	return api.get<ProductDataModel []>("/get-product", params);
    }

    // components/ProductList/index.tsx
    import { ProductDataParams } from "@/services/product/product.type.ts"
    import { ProductDataModel } from "@/services/product/product.model.ts"
    import { getProductData } from "@/services/product"

    export const ProductList = () => {
    	const [data, setData] = useState<ProductDataModel[]>([])
    	const [filter, setFilter] = useState<ProductDataParams>({
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
- Tránh việc sử dụng _any_. Nếu có data nào không rõ thì có thể để _unknown._

### Git

---

- Đặt tên nhánh **rõ ràng**, và **đúng nghĩa** với task đang làm.
- Mỗi nhánh sẽ chỉ tương ứng với **duy nhất** 1 task, không làm các task không liên quan trong nhánh đấy.
- Quy tắc đặt tên nhánh: _[prefix]/[số_task]\_[tên_task]_
- Prefix khi đặt tên nhánh:
  - **feature -** Tạo tính năng mới
  - **fix -** Sửa lỗi
  - **update -** Cập nhật tính năng
- Khi viết commit, cần viết rõ commit đấy đã chỉnh sửa gì trong code theo syntax: \*\*
  > _[prefix] [page]: [tính năng đã sửa]_
- Tránh đặt tên commit chỉ có mỗi 1 2 chữ như: save hay fix như hình dưới.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/2869967d-2403-43b8-b8f9-72272241893c/91574dd6-f57d-4b94-b0f1-ca9c15ff25e5/Untitled.png)

### Style

---

- Sử dụng TailwindCSS để style.
- Nếu style phức tạp thì tạo file _style.module.css_ để viết class nhằm tránh file _global.css_ phức tạp và khó bảo trì.
- Khi nối các className hay xử lý custom style, phải sử dụng hàm **_cn()_** từ utils.

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
