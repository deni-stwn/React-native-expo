// Import firebaseConfig.js yang telah dibuat sebelumnya
import { firebase, db, auth } from "../../firebaseConfig";

let firestore = db;

// Fungsi untuk mendapatkan ID pengguna yang sudah login
const getCurrentUserId = () => {
  const currentUser = auth.currentUser;
  return currentUser ? currentUser.uid : null;
};

// Fungsi untuk menambahkan pengguna dengan ID pengguna yang sudah login
export const addCurrentUserData = async (userData) => {
  const userId = getCurrentUserId();
  if (userId) {
    await firestore.collection("users").doc(userId).set(userData);
  }
};

const timestamp = firebase.firestore.FieldValue.serverTimestamp();
// Fungsi untuk menambahkan tugas dengan ID pengguna dan categori yang sudah login
export const addCurrentTask = async (taskData, categoryId) => {
  const userId = getCurrentUserId();
  if (userId) {
    const taskRef = await firestore.collection("tasks").add(taskData);
    await taskRef.update({
      id: taskRef.id,
      userId: userId,
      categoryId: categoryId,
      createdAt: timestamp,
      updatedAt: timestamp,
      isDone: false,
    });
  }
};

// Fungsi untuk menambahkan kategori dengan ID pengguna yang sudah login
export const addCurrentCategory = async (categoryData) => {
  const userId = getCurrentUserId();
  if (userId) {
    const categoryRef = await firestore.collection("categories").add({
      ...categoryData,
      userId: userId,
      createdAt: timestamp,
    });
    await categoryRef.update({
      id: categoryRef.id,
    });
  }
};

// Fungsi untuk menambahkan ID kategori ke array categoryIds di dokumen pengguna
// export const addCurrentCategory = async (categoryId) => {
//   const userId = getCurrentUserId();
//   if (userId) {
//     const userRef = firestore.collection("users").doc(userId);
//     await userRef.update({
//       categoryIds: firebase.firestore.FieldValue.arrayUnion(categoryId),
//     });
//   }
// };

// Fungsi untuk mendapatkan tugas berdasarkan ID pengguna yang sudah login
export const getCurrentUserTasks = async () => {
  const userId = getCurrentUserId();
  if (userId) {
    const taskSnapshot = await firestore
      .collection("tasks")
      // .orderBy("createdAt", "desc")
      .where("userId", "==", userId)
      .get();

    const userTasks = [];
    taskSnapshot.forEach((doc) => {
      userTasks.push({ id: doc.id, ...doc.data() });
    });

    return userTasks;
  }

  return [];
};

// Fungsi untuk mendapatkan tugas berdasarkan ID kategori
export const getTasksByCategory = async (categoryId) => {
  const taskSnapshot = await firestore
    .collection("tasks")
    .where("userId", "==", getCurrentUserId())
    .where("categoryId", "==", categoryId)
    .get();

  const tasks = [];
  taskSnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });

  return tasks;
};

// Fungsi untuk mendapatkan detail kategori berdasarkan ID kategori
export const getCategoryById = async (categoryId) => {
  const categoryRef = firestore.collection("categories").doc(categoryId);
  const categorySnapshot = await categoryRef.get();

  if (categorySnapshot.exists) {
    return { id: categorySnapshot.id, ...categorySnapshot.data() };
  } else {
    return null;
  }
};

// Fungsi untuk mendapatkan kategori berdasarkan ID pengguna yang sudah login
export const getCurrentUserCategories = async () => {
  const userId = getCurrentUserId();
  if (userId) {
    const userSnapshot = await firestore.collection("users").doc(userId).get();
    const userData = userSnapshot.data();

    if (userData && userData.categoryIds) {
      const categorySnapshot = await firestore
        .collection("categories")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          userData.categoryIds
        )
        .get();

      const userCategories = [];
      categorySnapshot.forEach((doc) => {
        userCategories.push({ id: doc.id, ...doc.data() });
      });

      return userCategories;
    }
  }

  return [];
};

// Fungsi untuk mendapatkan tugas berdasarkan kategori dari pengguna yang sudah login
export const getCurrentUserTasksByCategory = async (categoryId) => {
  const userTasks = await getCurrentUserTasks(); // Dapatkan semua tugas pengguna
  const tasksByCategory = await getTasksByCategory(categoryId); // Dapatkan tugas berdasarkan kategori

  // Filter tugas berdasarkan kategori dari tugas pengguna
  const userTasksByCategory = userTasks.filter((task) =>
    tasksByCategory.some((categoryTask) => categoryTask.id === task.id)
  );

  const allTasksByCategory = [...userTasks];

  // Urutkan tugas berdasarkan tanggal deadline
  allTasksByCategory.sort((a, b) => {
    const aDeadline = a.deadline.toDate();
    const bDeadline = b.deadline.toDate();
    return aDeadline - bDeadline;
  });

  return { tasks: allTasksByCategory, userTasks: userTasksByCategory };
};

//fungsi untuk mendapatkan category berdasarkan ID pengguna yang sudah login
export const getCurrentUserCategory = async () => {
  const userId = getCurrentUserId();
  if (userId) {
    const categorySnapshot = await firestore
      .collection("categories")
      .where("userId", "==", userId)
      .orderBy("createdAt", "asc")
      .get();
    const userCategory = [];
    categorySnapshot.forEach((doc) => {
      userCategory.push({ id: doc.id, ...doc.data() });
    });
    return userCategory;
  }
  return [];
};

// Fungsi untuk menghapus tugas berdasarkan ID tugas
export const deleteTask = async (taskId) => {
  await firestore.collection("tasks").doc(taskId).delete();
};

// Fungsi untuk menghapus kategori berdasarkan ID kategori
export const deleteCategory = async (categoryId) => {
  await firestore.collection("categories").doc(categoryId).delete();
};

// Fungsi untuk mengubah tugas berdasarkan ID tugas
export const updateTask = async (taskId, taskData) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  await firestore
    .collection("tasks")
    .doc(taskId)
    .update({ ...taskData, updatedAt: timestamp });
};

// fungsi untuk get task yang sudah selesai berdasarkan ID pengguna yang login
export const getDoneTask = async () => {
  const userId = getCurrentUserId();
  if (userId) {
    const taskSnapshot = await firestore
      .collection("tasks")
      .where("userId", "==", userId)
      .where("isDone", "==", true)
      .get();

    const userTasks = [];
    taskSnapshot.forEach((doc) => {
      userTasks.push({ id: doc.id, ...doc.data() });
    });

    return userTasks;
  }

  return [];
};

// fungsi untuk get task yang belum selesai berdasarkan ID pengguna yang login
export const getUndoneTask = async () => {
  const userId = getCurrentUserId();
  if (userId) {
    const taskSnapshot = await firestore
      .collection("tasks")
      .where("userId", "==", userId)
      .where("isDone", "==", false)
      .get();

    const userTasks = [];
    taskSnapshot.forEach((doc) => {
      userTasks.push({ id: doc.id, ...doc.data() });
    });

    return userTasks;
  }

  return [];
};
