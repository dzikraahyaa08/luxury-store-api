const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// --- 1. KONEKSI DATABASE ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Kosongkan jika pakai XAMPP standar
    database: 'barang_branded'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi ke database:', err.message);
        return;
    }
    console.log('Terhubung ke MariaDB (XAMPP)!');
});


// --- 2. CRUD DATA USER (Disesuaikan dengan struktur tabel asli) ---

// [POST] Mendaftarkan user baru dari Postman
app.post('/api/users/register', (req, res) => {
    // Menyesuaikan kolom asli: username, email, dan membership_level (default: Silver jika tidak diisi)
    const { username, email, membership_level } = req.body;
    const level = membership_level || 'Silver'; 

    const sql = 'INSERT INTO users (username, email, membership_level) VALUES (?, ?, ?)';
    
    db.query(sql, [username, email, level], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ 
            status: 'success', 
            message: 'User baru berhasil didaftarkan!', 
            user_id: result.insertId 
        });
    });
});

// [GET] Ambil semua data user
app.get('/api/users', (req, res) => {
    const sql = 'SELECT user_id, username, email, membership_level, created_at FROM users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', data: results });
    });
});

// [GET] Ambil user berdasarkan ID
app.get('/api/users/:id', (req, res) => {
    const sql = 'SELECT user_id, username, email, membership_level, created_at FROM users WHERE user_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' });
        res.json({ status: 'success', data: results[0] });
    });
});

// [PUT] Update data user
app.put('/api/users/:id', (req, res) => {
    const { username, email, membership_level } = req.body;
    const sql = 'UPDATE users SET username = ?, email = ?, membership_level = ? WHERE user_id = ?';
    db.query(sql, [username, email, membership_level, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Data user berhasil diperbarui' });
    });
});

// [DELETE] Hapus user
app.delete('/api/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'User berhasil dihapus' });
    });
});

// --- 2.5. CRUD DATA MASTER (Brands) ---

// [GET] Ambil semua brand
app.get('/api/brands', (req, res) => {
    const sql = 'SELECT * FROM brands';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', data: results });
    });
});

// [POST] Tambah brand baru
app.post('/api/brands', (req, res) => {
    const { brand_name, origin_country } = req.body;
    const sql = 'INSERT INTO brands (brand_name, origin_country) VALUES (?, ?)';
    db.query(sql, [brand_name, origin_country], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Brand berhasil ditambahkan', id: result.insertId });
    });
});

// [PUT] Update brand
app.put('/api/brands/:id', (req, res) => {
    const { brand_name, origin_country } = req.body;
    const sql = 'UPDATE brands SET brand_name = ?, origin_country = ? WHERE brand_id = ?';
    db.query(sql, [brand_name, origin_country, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Brand berhasil diperbarui' });
    });
});

// [DELETE] Hapus brand
app.delete('/api/brands/:id', (req, res) => {
    const sql = 'DELETE FROM brands WHERE brand_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            // Error 1451: Foreign Key Constraint Fails
            if (err.errno === 1451) {
                return res.status(400).json({ error: 'Tidak dapat menghapus brand ini karena produknya sudah terikat dengan riwayat pesanan (order_items).' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ status: 'success', message: 'Brand berhasil dihapus' });
    });
});


// --- 3. CRUD DATA MASTER (Products) ---

// [GET] Ambil semua produk
app.get('/api/products', (req, res) => {
    const sql = 'SELECT p.*, b.brand_name FROM products p JOIN brands b ON p.brand_id = b.brand_id';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', data: results });
    });
});

// [POST] Tambah produk baru
app.post('/api/products', (req, res) => {
    const { brand_id, name, model_year, price, stock } = req.body;
    const sql = 'INSERT INTO products (brand_id, name, model_year, price, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [brand_id, name, model_year, price, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Produk berhasil dibuat', id: result.insertId });
    });
});

// [PUT] Update produk
app.put('/api/products/:id', (req, res) => {
    const { brand_id, name, model_year, price, stock } = req.body;
    const sql = 'UPDATE products SET brand_id = ?, name = ?, model_year = ?, price = ?, stock = ? WHERE product_id = ?';
    db.query(sql, [brand_id, name, model_year, price, stock, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Produk berhasil diperbarui' });
    });
});

// [DELETE] Hapus produk
app.delete('/api/products/:id', (req, res) => {
    const sql = 'DELETE FROM products WHERE product_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            if (err.errno === 1451) {
                return res.status(400).json({ error: 'Tidak dapat menghapus produk ini karena sudah terikat dengan riwayat pesanan (order_items).' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ status: 'success', message: 'Produk berhasil dihapus' });
    });
});


// --- 4. CRUD DATA TRANSAKSIONAL (Orders) ---

// [POST] Buat Pesanan Baru (Dengan Order Items & Update Stok)
app.post('/api/orders', (req, res) => {
    const { user_id, items } = req.body; 
    // items format: [{ product_id: 1, quantity: 2, price: 50000000 }]

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Keranjang belanja kosong' });
    }

    // Hitung total_amount
    const total_amount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Mulai transaksi database
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: err.message });

        // 1. Insert ke tabel orders
        const sqlOrder = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
        db.query(sqlOrder, [user_id, total_amount], (err, orderResult) => {
            if (err) {
                if (err.errno === 1452) {
                    return db.rollback(() => res.status(400).json({ error: `User dengan ID ${user_id} tidak terdaftar di database. Pastikan user_id valid.` }));
                }
                return db.rollback(() => res.status(500).json({ error: err.message }));
            }

            const order_id = orderResult.insertId;

            // 2. Siapkan data untuk insert order_items
            const orderItemsData = items.map(item => [
                order_id, 
                item.product_id, 
                item.quantity, 
                item.quantity * item.price
            ]);
            const sqlOrderItems = 'INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES ?';

            db.query(sqlOrderItems, [orderItemsData], (err, itemsResult) => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                // 3. Update stok produk satu per satu
                let completedUpdates = 0;
                let hasError = false;

                items.forEach(item => {
                    const sqlUpdateStock = 'UPDATE products SET stock = stock - ? WHERE product_id = ? AND stock >= ?';
                    db.query(sqlUpdateStock, [item.quantity, item.product_id, item.quantity], (err, updateResult) => {
                        if (err || updateResult.affectedRows === 0) {
                            if (!hasError) {
                                hasError = true;
                                return db.rollback(() => res.status(400).json({ error: `Stok tidak cukup untuk product_id ${item.product_id} atau terjadi error` }));
                            }
                        } else {
                            completedUpdates++;
                            if (completedUpdates === items.length && !hasError) {
                                // Selesai, Commit transaksi
                                db.commit((err) => {
                                    if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                                    res.json({ status: 'success', message: 'Transaksi Berhasil', order_id: order_id });
                                });
                            }
                        }
                    });
                });
            });
        });
    });
});

// [GET] Ambil Riwayat Pesanan
app.get('/api/orders', (req, res) => {
    const sql = `
        SELECT o.order_id, o.order_date, o.total_amount, u.username 
        FROM orders o 
        LEFT JOIN users u ON o.user_id = u.user_id
        ORDER BY o.order_date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', data: results });
    });
});

// [GET] Ambil Detail Pesanan (Termasuk Item yang Dibeli)
app.get('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;
    
    // Get Order Info
    const sqlOrder = `
        SELECT o.order_id, o.order_date, o.total_amount, u.username, u.email 
        FROM orders o LEFT JOIN users u ON o.user_id = u.user_id WHERE o.order_id = ?
    `;
    
    db.query(sqlOrder, [orderId], (err, orderResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (orderResult.length === 0) return res.status(404).json({ error: 'Order tidak ditemukan' });

        // Get Order Items
        const sqlItems = `
            SELECT oi.quantity, oi.subtotal, p.name, p.price, b.brand_name
            FROM order_items oi
            JOIN products p ON oi.product_id = p.product_id
            JOIN brands b ON p.brand_id = b.brand_id
            WHERE oi.order_id = ?
        `;
        
        db.query(sqlItems, [orderId], (err, itemsResult) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const responseData = {
                ...orderResult[0],
                items: itemsResult
            };
            res.json({ status: 'success', data: responseData });
        });
    });
});


// --- 5. STATISTIC DATA TRANSAKSIONAL ---

app.get('/api/statistics', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM users) as total_users,
            (SELECT SUM(total_amount) FROM orders) as total_revenue,
            (SELECT COUNT(*) FROM products WHERE stock < 5) as low_stock_items
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', statistics: results[0] });
    });
});


// JALANKAN SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server API Luxury Store berjalan di http://localhost:${PORT}`);
});