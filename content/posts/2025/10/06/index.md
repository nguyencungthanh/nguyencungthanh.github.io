---
title: Lời giải một bài toán phương trình hàm 
date: 2025-10-06
categories:
  - writings
tags:
  - Functional Equation
---

<!--more-->

## 1. Bài toán

<div style="border: 2px solid #ccc; border-radius: 8px; padding: 8px; background-color: #f9f9f9;">
Tìm tất cả các hàm nhân tính số học $f: \mathbb{Z}^+ \to \mathbb{R}$, không đồng nhất 0, thoả mãn: 
$$f(a^2+b^2+c^2+d^2) = f(a^2+b^2)+f(c^2+d^2)\quad \forall a, b, c, d \in \mathbb{Z}^+.$$ 
</div>

## 2. Lemma 

<div class="lemma">
<b>Lemma 1.</b> Với $p \in \mathbb{P}$ mà $p \equiv 1 \pmod{4}$ thì tồn tại các số nguyên dương $a, b$ sao cho $$p = a^2 + b^2.$$

Từ đó, ta thấy rằng nếu số nguyên dương $n$ chỉ có ước nguyên tố dạng $4k+1$ thì tồn tại các số nguyên dương $n_1, n_2$ mà $$n = n_1^2+n_2^2.$$ 
</div>

<div class="lemma">
<b>Lemma 2.</b> $p \in \mathbb{P}$ mà $p \equiv 3 \pmod{8}$ thì tồn tại các số nguyên dương $a, b$ sao cho $$p = a^2 + 2b^2.$$

Từ đó, ta thấy rằng nếu số nguyên dương $n$ chỉ có ước nguyên tố dạng $8k+3$ thì tồn tại các số nguyên dương $n_1, n_2$ mà $$n = n_1^2+2n_2^2.$$
</div>

<div class="lemma">
<b>Lemma 3.</b>Với $p \in \mathbb{P}$ mà $p \equiv 7 \pmod{8}$ thì tồn tại các số nguyên dương $a, b, c, d$ sao cho $$p = a^2 + b^2 + c^2 + d^2.$$

Do bổ đề 1 và 2 quen thuộc nên ta sẽ chỉ chứng minh bổ đề 3. 

Chọn $c, d$ dương bất kì và cố định $c^2 + d^2 = t.$ 
Ta xét 2 tập $S_1 = \{x^2: x \in \mathbb{F}_p\}$ và $S_2 = \{-t-y^2: y \in \mathbb{F}_p \}$ thì ta thấy rằng $S_1$ và $S_2$ có đúng $\dfrac{p+1}{2}$ phần từ và do đó $S_1 \cap S_2 \neq \emptyset$ hay tồn tại các số $a, b$ sao cho $a^2+b^2+c^2+d^2$ chia hết cho $p$ kéo theo tồn tại số nguyên dương $k$ sao cho $$a^2 + b^2 + c^2 + d^2 = kp.$$ Nếu $k = 1$ thì để ý rằng $p \equiv 7 \pmod 8$ nên $a,b,c,d$ phải khác 0. 

Trước tiên, nếu $k$ chẵn thì KMTTQ, giả sử $ a \equiv b \pmod{2} $ và $ c \equiv d \pmod{2} $. Xét:
$$
a_1 = \frac{a + b}{2}, \quad b_1 = \frac{a - b}{2}, \quad c_1 = \frac{c + d}{2}, \quad d_1 = \frac{c - d}{2}.
$$
Khi đó
$$
a_1^2 + b_1^2 + c_1^2 + d_1^2 = \left( \frac{a + b}{2} \right)^2 + \left( \frac{a - b}{2} \right)^2 + \left( \frac{c + d}{2} \right)^2 + \left( \frac{c - d}{2} \right)^2 = \frac{a^2 + b^2 + c^2 + d^2}{2} = \frac{kp}{2}.
$$ 
Từ đó, tồn tại $ k_1 = \frac{k}{2} $ nguyên dương mà $ k_1 p = a_1^2 + b_1^2 + c_1^2 + d_1^2 $.

Lặp lại quá trình trên ta suy ra tồn tại $ k_l $ sao cho $ k_lp = a_l^2 + b_l^2 + c_l^2 + d_l^2 $. Vì $ k_l $ lẻ nên ta chọn $ e, f, g, h \in \left\\{ -\frac{l - 1}{2}, \dots, \frac{l - 1}{2} \right\\}  $ sao cho:
$$
a_l \equiv e, \quad b_l \equiv f, \quad c_l \equiv g, \quad d_l \equiv h \pmod{k_l}.
$$
Và ta có tổng của bình phương 4 số trên thoả mãn
$$
e^2 + f^2 + g^2 + h^2 < 4 \left( \frac{k_l}{2} \right)^2 = k_l^2.
$$
Giờ xét tích 
$$
(a_l^2 + b_l^2 + c_l^2 + d_l^2)(e^2 + f^2 + g^2 + h^2) < k_l^2 \cdot k_l p = k_l^3 p.
$$
Và ta thấy vế trái cũng là tổng của 4 số chính phương và tổng này chia hết cho $k_l^2$ nên chia $ k_l^2 $, ta suy ra tồn tại các số $ a_{l+1}, b_{l+1}, c_{l+1}, d_{l+1} $ sao cho:
$$
a_{l+1}^2 + b_{l+1}^2 + c_{l+1}^2 + d_{l+1}^2 = k_{l+1} p,
$$
mà $ k_{l+1} < k_l $.

Lặp lại quá trình trên suy ra ta xây dựng được một dãy giảm ngặt $ (k_i) $ bị chặn dưới bởi 1 nên phải tồn tại \$ k_m = 1 \$ và các số nguyên dương $a_m, b_m, c_m, d_m$ mà:
$$
a_m^2 + b_m^2 + c_m^2 + d_m^2 = k_mp = p.
$$
</div> 

## 3. Lời giải bài toán

Ta có nhận xét sau: 

**Nhận xét 1:** Với $u, v$ là hai số nguyên dương lẻ thì $$f(u^2+v^2) = f(u^2) + f(v^2).$$
Thật vậy, ta có $$2f(u^2)+2f(v^2) = f(2u^2)+f(2v^2) = f(2u^2+2v^2) = f((u^2+v^2)+(u^2+v^2)) =  2f(u^2+v^2),$$ từ đó ta thu được nhận xét trên. Mặt khác thì ta dễ dàng tính được $f(n) = n, \forall n \le 20$ và ta sẽ chứng minh rằng $f(n) = n$ với mọi $n$ nguyên dương bằng quy nạp theo $n.$ Ta để ý rằng nếu $n$ có ít nhất 2 ước nguyên tố thì phải tồn tại các số $n_1, n_2$ nguyên tố cùng nhau mà $n = n_1n_2$ nên $$f(n) = f(n_1)f(n_2) = n_1n_2 = n.$$
Như vậy, ta chỉ cần xét $n = p^k$ với $p$ là một số nguyên tố. 

#### Trường hợp 1: $p = 2$.

$\bullet$ $k = 2m.$ Khi ấy $$f(2^k) = f(2^{2m}) = f(4 \cdot 2^{2m-2}) = 2f(2^{2m-1}) = 2^{2m}.$$ 

$\bullet$ $k = 2m + 1.$ Khi ấy, $$5f(2^{2m+1}) = f(10\cdot 2^{2m}) = f(2^{2m} + 2^{2m+2} + 2^{2m} + 2^{2m+2}) = 2f(5\cdot 2^{2m}) = 10f(2^{2m}) = 10\cdot 2^{2m}.$$ Kéo theo $f(2^k) = 2^k$ như mong muốn. 

#### Trường hợp 2: $p \equiv 1 \pmod 4$
Từ bổ đề 1, ta thấy rằng tồn tại số 2 số nguyên dương $u, v$ với $u$ lẻ và $v$ chẵn thoả mãn: $$p = u^2 + v^2.$$ 

$\bullet$ $k = 1.$ Khi này, ta có nhận xét rằng $$f(p+1) = f\left(2\cdot \frac{p+1}{2}\right) = p+1.$$Từ đó, ta có $$2f(p) = f(2p) = f(2u^2+2v^2) = f(2u^2)+f(2v^2) = 2f(u^2)+f(2v^2) = 2u^2+f(2v^2)$$

Nếu $v < u$ thì ta suy ra $2v^2 < p$ nên ta sẽ có được $f(p)  = p$ như mong muốn nên ta chỉ xét $v > u.$ Đặt $v = 2^kt$ với $t$ lẻ và nếu $t > 1$ thì ta cũng suy ra $2^{2k+1}, t^2 < p$ nên $f(2v^2) = 2v^2$ kéo theo $f(p) = p$ nên ta xét $v = 2^k.$ 

Khi ấy, đặt $u = 5^ms$  với $\gcd(s,5) =1$. Ta thấy rằng $5 =  1^2 + 2^2$ nên tồn tại các số $u_m, v_m$ mà $5^{2m} = u_m^2 + v_m^2$. Giờ ta xét $f(5p)$ thì

$$
\begin{align}
f(5p) &= f(2^{2k} + 2^{2k+2}  +  5^{2m}s^2 + 4\cdot 5^{2m}s^2)\\\
&= f(5\cdot 2^{2k}) + f(5^{2m+1}s^2) \\\
&= 5\cdot2^{2k} + f(u_m^2+v_m^2 + 4u_m^2+4v_m^2)s^2 \\\
&= 5\cdot2^{2k} + [f(u_m^2+v_m^2) + f(4(u_m^2+v_m^2))]s^2 \\\
&= 5\cdot2^{2k} + [u_m^2+v_m^2 + 4(u_m^2+v_m^2)]s^2 \\\
&= 5p 
\end{align}
$$
nên $f(p) = p$ như mong muốn. 

$\bullet$ $k > 1$, khi này tồn tại các số $u_{k-1},v_{k-1}, u_{k}, v_{k}$ mà $$p^{k-1} = u_{k-1}^2+v_{k-1}^2 \quad \text{và} \quad p^{k} = u_{k}^2+v_{k}^2.$$
Thế nên $$(p+1)p^{k-1} = f(p+1)f(p^{k-1}) = f(p^{k} + p^{k-1}) = f(u_{k}^2 + v_{k}^2 + u_{k-1}^2 + v_{k-1}^2) = f(p^{k}) + f(p^{k-1}) =  f(p^{k}) + p^{k-1}$$ 

Cho ta $f(p^k) = p^k$ và ta hoàn tất chứng minh trường hợp này. 

#### Trường hợp 3: $p \equiv 3 \pmod 8$

Từ bổ đề 2, ta thấy rằng tồn tại các số nguyên dương lẻ $u, v$ mà $$p = u^2 + 2v^2.$$ 

$\bullet$ $k = 1.$ Khi này, ta cũng có nhận xét rằng $$f(p+1) = f\left(4\cdot \frac{p+1}{4}\right) = p+1.$$

Mặt khác ta chứng minh $f(p+2) = p+2.$ Nếu $p+2$ có ít nhất hai ước nguyên tố thì ta dễ thấy rằng $f(p+2) =  p+2$ do đó ta xét $p+2 = q^{2m+1}$ với $q\in \mathbb{P}, q \equiv 5 \pmod 8$ và $m \in \mathbb{N}$.
Từ bổ đề 1, tồn tại các số nguyên dương $k$ lẻ, $l$ chẵn để mà $$q = k^2 + l^2.$$ Nếu $k = 1, l^2 = p+1$ thì $$2f(q) = f(2q) = f(2+2l^2) = f(2) + f(2l^2) = 2+f(2(p+1)) = 2+f\left(8\cdot \frac{p+1}{4}\right) = 2q$$ nên $f(q) = q.$ Còn nếu $k, l \ge 2$ thì $k^2, l^2 < p$ nên ta có thể làm tương tự trường hợp 1 để suy ra $f(q) = q$ và $f(q^{2m+1}) = q^{2m+1}.$

Tóm lại ta có $$f(p+2) = p+2.$$ 

Vì $p,u$ đều lẻ nên chú ý nhận xét 1, ta có $$(p+1)f(p) = f(p^2 + p) = f(p^2 + u^2 + 2v^2) = f(p^2+u^2) + f(2v^2) = f(p^2)+p.$$ 

Bên cạnh đó $$(p+2)f(p) = f(p^2+2p) = f(p^2+2u^2+(2v)^2) = f(p^2+u^2) + f(u^2+4v^2) = f(p^2) + u^2 + f(u^2+4v^2).$$
Kết hợp với phương trình trước đó, ta suy ra 
$$f(p) = f(u^2+4v^2) - 2v^2. $$
Ta có $$2f(u^2+4v^2) = f(u^2 + u^2 + 4u^2+4u^2) = f(2u^2) + f(8v^2) = 2f(u^2)+8f(v^2) = 2(u^2+4v^2)$$
nên ta suy ra được $f(p) = p$ như mong muốn. 

$\bullet$ $k > 1.$ Khi ấy, ta thấy rằng tồn tại số nguyên dương $u_{k-1}$ lẻ và $v_{k-1}$ sao cho $$p^{k-1} = u_{k-1}^2+2v_{k-1}^2.$$ Giờ ta xét hai trường hợp:
- $k = 2m.$ Khi này, ta có $$(p+1)p^{k-1} = f(p^k+p^{k-1}) = f(p^{2m}+u_{k-1}^2+2v_{k-1}^2) = f(p^{2m}) + f(u_{k-1}^2) + f(2v_{k-1}^2) = f(p^k) + p^{k-1}$$ nên $f(p^k) = p^k.$  

- $k = 2m+1$. Khi này, ta thấy rằng tồn tại số nguyên dương $u_{k}$ lẻ và $v_{k}$ sao cho $$p^{k} = u_{k}^2+2v_{k}^2.$$ Mặt khác, ta có $$(p^2+1)p^{k-1} =  f(p^{k+1}+p^{k-1}) = f(p^{2m+2} + u_{k-1}^2+2v_{k-1}^2) = f(p^{2m+2})+p^{k-1}$$
    nên $f(p^{k+1}) = p^{k+1}.$ Từ đây, ta lại có 
    $$(p+1)f(p^{k}) = f(p^{k+1}+p^k) = f(p^{k+1}+u_k^2+2v_k^2) = f(p^{k+1})+ f(u_k^2)+f(2v_k^2) = p^{k+1} + p^k $$
    nên $f(p^k) = p^k$ như mong muốn. 

#### Trường hợp 4: $p\equiv 7 \pmod 8$
Từ bổ đề 3, ta thấy rằng tồn tại các số nguyên dương $a,b,c,d$ sao cho $p = a^2 + b^2 + c^2 + d^2$. Khi này $$p^2 = (a^2-b^2-c^2-d^2)^2 + (2ab)^2 + (2ac)^2+(2ad)^2$$ và vì nếu $a^2 = b^2 + c^2 + d^2$ thì $p$ sẽ là số chẵn (mâu thuẫn). Từ đó $p^2$ là tổng 4 số chính phương dương. 

Ta viết $p^2 = u^2+v^2+w^2+t^2$ và nếu $k = 1, 2$ thì ta suy ra $f(p^k) = p^k.$ Giờ ta xét $k > 2. $
- $k = 2m.$ Khi ấy, $$f(p^k) = f( (up^{m-1})^2 + (vp^{m-1})^2 +  (wp^{m-1})^2 + (tp^{m-1})^2) = p^k.$$
- $k = 2m+1.$ Khi ấy $$f(p^k) = f( (ap^{m})^2 + (bp^{m})^2 +  (cp^{m})^2 + (dp^{m})^2) = p^k.$$

Tóm lại ta có $f(p^k) = p^k$ như mong muốn. 

Vậy từ các trường hợp trên, ta suy ra $f(n) = n$ với mọi $n$ nguyên dương. 