
import { DataTypes,Sequelize } from 'sequelize';
import { sequelize } from '../../config/database/database.js';


const Repair = sequelize.define('repairs', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    motorsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false
    }
// }
// , {
//    indexes: [
//   {
//     unique: true,
//     fields: ['userId', 'start_time'],
//   },
//   ],
});

export default Repair;  